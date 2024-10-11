import Customer from "@/models/Customer";

export async function GET() {
  const customers = await Customer.find().sort({ memberNumber: 1 });
  return new Response(JSON.stringify(customers), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const customer = new Customer(body);
  await customer.save();
  return new Response(JSON.stringify(customer), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return new Response(JSON.stringify(customer), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return new Response(JSON.stringify({ message: "Customer deleted" }), {
    headers: { "Content-Type": "application/json" },
  });
}