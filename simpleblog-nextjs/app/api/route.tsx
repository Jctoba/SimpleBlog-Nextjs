export function GET(request:any){
    return new Response("Hello, Next.js!");
}

export async function POST(request:any){
    const body = await request.text();
    return new Response(body);
}