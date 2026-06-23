export async function generateProductAI(
    title: string,
    productInfo: string
){
    const res = await fetch(
        "/api/ai/generate-product",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                title,
                productInfo
            })
        }
    );

    if(!res.ok){
        throw new Error("Generate gagal");
    }

    return res.json();
}