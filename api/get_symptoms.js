export async function GET(request) {
  try {
    const phpResponse = await fetch("https://medguidex.rf.gd/get_symptoms.php", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const text = await phpResponse.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "InfinityFree returned HTML instead of JSON.",
          preview: text.slice(0, 500),
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Vercel could not reach get_symptoms.php.",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
