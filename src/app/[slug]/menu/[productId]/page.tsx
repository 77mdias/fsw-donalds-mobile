import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import Details from "./components/details";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{slug: string, productId: string}>
}

const ProductPage = async ({ params }: ProductPageProps) => {

  const {slug,  productId } = await params;
  const product = await db.product.findUnique({ where: { id: productId }, include: { restaurant: true } });
  if (!product) {
    notFound();
  }

  if (slug !== product.restaurant.slug) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <ProductHeader product={product} />
      <Details product={product} />
    </div>
  )
};

export default ProductPage;