"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ConsumptionMethod } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../../actions/create-order";
import { CartContext } from "../../contexts/cart";
import { isValidCpf } from "../../helpers/cpf";

const formSchema = z.object({
  username: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  cpf: z
    .string()
    .trim()
    .min(1, { message: "CPF é obrigatório" })
    .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

const FinishOrderButton = () => {
  const [isPending, startTransition] = useTransition();
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      cpf: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      startTransition(async () => {
        await createOrder({
        customerName: data.username,
        customerCpf: data.cpf,
        products,
        consumptionMethod,
          slug,
          total: 0,
        });
        //Fecha o Drawer após sucesso do pedido
        setIsDrawerOpen(false);
        //Limpa o formulário
        form.reset();
        toast.success("Pedido criado com sucesso");
        console.log("Pedido criado com sucesso");
      });
    } catch (error) {
      toast.error("Erro ao criar pedido");
      console.error(error);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button className="mb-5 w-full rounded-full">Finalizar compra</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar compra</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar a compra
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite seu nome..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        customInput={Input}
                        format="###.###.###-##"
                        mask="_"
                        {...field}
                        placeholder="Digite seu CPF..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  variant="destructive"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Finalizar compra"
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    onClick={() => {
                      form.reset();
                      setIsDrawerOpen(false);
                    }}
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderButton;
