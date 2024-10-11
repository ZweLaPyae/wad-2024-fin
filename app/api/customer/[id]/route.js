import Customer from "@/models/Customer";

export async function GET(request, { params }) {
  const id = params.id;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(customer), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}