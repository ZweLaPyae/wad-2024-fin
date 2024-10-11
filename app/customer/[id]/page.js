"use client";
import { useEffect, useState } from 'react';

export default function CustomerDetail({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const url = `${API_BASE}/customer/${params.id}`;
      console.log("Fetching URL:", url);

      try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to fetch customer: ${response.statusText}`);
        }
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer:", error);
        setError(error.message);
      }
    };

    fetchCustomer();
  }, [API_BASE, params.id]);

  if (error) {
    return (
      <div className="m-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-red-600">Failed to load customer details: {error}</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="m-4">
        <h1 className="text-2xl font-bold">Loading...</h1>
        <p>Loading customer details...</p>
      </div>
    );
  }

  return (
    <div className="m-4 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Customer Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Name</h2>
          <p className="text-gray-700">{customer.name}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Date of Birth</h2>
          <p className="text-gray-700">{new Date(customer.dateOfBirth).toLocaleDateString('en-GB')}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Member Number</h2>
          <p className="text-gray-700">{customer.memberNumber}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Interests</h2>
          <p className="text-gray-700">{customer.interests}</p>
        </div>
      </div>
    </div>
  );
}