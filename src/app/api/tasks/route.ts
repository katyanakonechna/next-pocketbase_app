import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path =
    process.env.BASE_URL + `/api/collections/tasks/records?${searchParams}`;
  const res = await fetch(path, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const tasks = await res.json();

  return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
  const path = process.env.BASE_URL + '/api/collections/tasks/records';
  const params: any = {
    duplex: 'half',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  };
  const res = await fetch(path, {
    method: 'POST',
    body: req.body,
    ...params
  });

  const task = await res.json();

  return NextResponse.json(task);
}

export async function PATCH(req: Request) {
  const {id, params: body} =  await req.json();
  const path = process.env.BASE_URL + `/api/collections/tasks/records/${id}`;
  const params: any = {
    duplex: 'half',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  };
  const responce = await fetch(path, {
    method: 'PATCH',
    body,
    ...params
  });

  const task = await responce.json();

  return NextResponse.json(task);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  console.log(url);
  const path = process.env.BASE_URL + `/api/collections/tasks/records/`;
  const params: any = {
    duplex: 'half',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(path, {
    method: 'DELETE',
    ...params
  });

  const task = await response.json();

  return NextResponse.json(task);
}
