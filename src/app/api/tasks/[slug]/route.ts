import { NextResponse } from "next/server";

export async function PATCH(req: Request, res: any) {
  const path = process.env.BASE_URL + `/api/collections/tasks/records/${res.params.slug}`;
  const params: any = {
    duplex: 'half',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  };
  const responce = await fetch(path, {
    method: 'PATCH',
    body: req.body,
    ...params
  });

  const task = await responce.json();

  return NextResponse.json(task);
}

export async function DELETE(request: Request, res: any) {
  const path = process.env.BASE_URL + `/api/collections/tasks/records/${res.params.slug}`;

  const response = await fetch(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return NextResponse.json({ success: true});
}