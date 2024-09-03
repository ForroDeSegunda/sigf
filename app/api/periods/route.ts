import supabase, { TPeriod } from "@/utils/db";
import { NextResponse } from "next/server";

const TABLE = "period";

export async function GET() {
  const { data, error } = await supabase.from(TABLE).select();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data as TPeriod[]);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase.from(TABLE).insert(body);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from(TABLE).delete().eq("id", body.id);

  if (error) {
    if (error.code === "23503")
      return NextResponse.json(error.message, { status: 409 });

    return NextResponse.json(error.message, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from(TABLE)
    .update(body)
    .eq("id", body.id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
