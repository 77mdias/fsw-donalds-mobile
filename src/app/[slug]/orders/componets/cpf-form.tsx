"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, { message: "CPF é obrigatório" })
    .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
  });
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: FormSchema) => {
    router.replace(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };
  const handleCancel = () => {
    form.reset();
    router.back()
  };

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>Digite seu CPF abaixo para visualizar seus pedidos</DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel>Seu CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="###.###.###-##"
                      placeholder="Digite seu CPF..."
                      mask="_"
                      customInput={Input}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> 
                </FormItem>
              )}
            />
            <DrawerFooter>
              <Button type="submit" variant="destructive" className="w-full rounded-full">Confirmar</Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full rounded-full" onClick={handleCancel}>Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
        </form>
      </Form>
        
      </DrawerContent>
    </Drawer>
  )
};


export default CpfForm;