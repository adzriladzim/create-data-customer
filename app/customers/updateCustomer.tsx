"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Customer = {
  id: number;
  namaCustomer: string;
  kendala: string;
};

export default function UpdateCustomer(customer: Customer) {
  const [namaCustomer, setNamaCustomer] = useState(customer.namaCustomer);
  const [kendala, setKendala] = useState(customer.kendala);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:5000/customers/${customer.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namaCustomer: namaCustomer,
        kendala: kendala,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {customer.namaCustomer}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nama Customer</label>
              <input
                type="text"
                value={namaCustomer}
                onChange={(e) => setNamaCustomer(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama Customer"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Kendala</label>
              <input
                type="text"
                value={kendala}
                onChange={(e) => setKendala(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Kendala"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
