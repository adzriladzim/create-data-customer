"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [namaCustomer, setNamaCustomer] = useState("");
  const [kendala, setKendala] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namaCustomer: namaCustomer,
        kendala: kendala,
      }),
    });

    setIsMutating(false);

    setNamaCustomer("");
    setKendala("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add Data Customer
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambahkan Nama Customer</h3>
          <form onSubmit={handleSubmit}>
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
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
