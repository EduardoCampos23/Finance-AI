"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Schema, z } from "zod";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formschema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),

  type: z.nativeEnum(TransactionType, {
    message: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "Defina a transação.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    message: "O método de pagamento é obrigatório.",
  }),

  date: z.date({
    required_error: "Informe a data",
  }),

  amount: z.string().trim().min(1, {
    message: "Você precisa especificar o valor",
  }),
});

const AddTransactionsButton = () => {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      amount: "",
      category: TransactionCategory.OTHER,
      date: new Date(),
      name: "",
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  });

  const onSubmit = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo:</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Adicionar</Button>
          <Button variant="outline">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionsButton;
