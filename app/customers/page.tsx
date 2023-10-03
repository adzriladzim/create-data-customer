import AddCustomer from "./addCustomer";
import DeleteCustomer from "./deleteCustomer";
import UpdateCustomer from "./updateCustomer";

// export const metadata = {
//   title: "Product List",
// };

type Customer = {
  id: number;
  namaCustomer: string;
  kendala: string;
};

async function getCustomers() {
  const res = await fetch("http://localhost:5000/customers", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductList() {
  const customers: Customer[] = await getCustomers();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddCustomer />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Customer</th>
            <th>Kendala</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.namaCustomer}</td>
              <td>{customer.kendala}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateCustomer {...customer} />
                </div>

                <DeleteCustomer {...customer} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
