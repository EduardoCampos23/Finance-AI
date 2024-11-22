import { db } from "../_lib/prisma";

import { DataTable } from "../_components/ui/data_table";
import { transactioncolumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionsPage = async () => {
  // Acessar as transações do banco
  const transactions = await db.transaction.findMany({});
  return (
    <div className="p-6 space-y-6">
      <div className="flex w-full justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>

      <DataTable columns={transactioncolumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
