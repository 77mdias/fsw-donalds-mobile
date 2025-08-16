import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../../../../app/[slug]/menu/helpers/cpf";

export async function POST(request: Request) {
  try {
    console.log("🔔 Webhook do Stripe recebido");

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("❌ Chave secreta do Stripe não encontrada");
      throw new Error("Missing Stripe secret key");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      console.error("❌ Assinatura do Stripe não encontrada");
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 },
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
    if (!webhookSecret) {
      console.error("❌ Chave secreta do webhook do Stripe não encontrada");
      throw new Error("Missing Stripe webhook secret key");
    }

    const text = await request.text();
    console.log("📄 Corpo da requisição recebido, tamanho:", text.length);

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(text, signature, webhookSecret);
      console.log("✅ Evento do Stripe construído com sucesso:", event.type);
    } catch (err) {
      console.error("❌ Erro ao construir evento do Stripe:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const paymentIsSucessful = event.type === "checkout.session.completed";
    console.log("💳 Pagamento bem-sucedido?", paymentIsSucessful);

    if (paymentIsSucessful) {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      console.log("🛒 ID do pedido encontrado:", orderId);
      console.log("📋 Metadata completa:", session.metadata);

      if (!orderId) {
        console.warn("⚠️ ID do pedido não encontrado nos metadados");
        return NextResponse.json({
          received: true,
          warning: "No order ID found",
        });
      }

      try {
        // Verificar se o pedido existe antes de atualizar
        const existingOrder = await db.order.findUnique({
          where: {
            id: Number(orderId),
          },
        });

        if (!existingOrder) {
          console.error("❌ Pedido não encontrado no banco de dados:", orderId);
          return NextResponse.json(
            { error: "Order not found", orderId },
            { status: 404 },
          );
        }

        console.log(
          "📊 Pedido encontrado, status atual:",
          existingOrder.status,
        );

        const updatedOrder = await db.order.update({
          where: {
            id: Number(orderId),
          },
          data: {
            status: "PAYMENT_CONFIRMED",
          },
          include: {
            restaurant: { select: { slug: true } },
            OrderProcuct: true,
          },
        });

        console.log("✅ Pedido atualizado com sucesso:", {
          orderId: updatedOrder.id,
          newStatus: updatedOrder.status,
        });

        revalidatePath(
          `/${updatedOrder.restaurant.slug}/orders?cpf=${removeCpfPunctuation(
            updatedOrder.customerCpf,
          )}`,
        );
      } catch (dbError) {
        console.error(
          "❌ Erro ao atualizar pedido no banco de dados:",
          dbError,
        );

        const updatedOrder = await db.order.update({
          where: {
            id: Number(orderId),
          },
          data: {
            status: "PAYMENT_FAILED",
          },
          include: {
            restaurant: { select: { slug: true } },
            OrderProcuct: true,
          },
        });

        revalidatePath(
          `/${updatedOrder.restaurant.slug}/orders?cpf=${removeCpfPunctuation(
            updatedOrder.customerCpf,
          )}`,
        );

        return NextResponse.json(
          { error: "Database update failed", orderId },
          { status: 500 },
        );
      }
    }

    console.log("✅ Webhook processado com sucesso");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro geral no webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
