import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const KIE_BASE_URL = process.env.KIE_BASE_URL || 'https://api.kie.ai';
const KIE_API_KEY = process.env.KIE_API_KEY;
const KIE_MODEL = 'nano-banana-pro';

export async function POST(request: NextRequest) {
  if (!KIE_API_KEY) {
    return NextResponse.json(
      { error: 'KIE_API_KEY is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { templateUrl, userImageUrl } = body as {
      templateUrl: string;
      userImageUrl: string;
    };

    if (!templateUrl || !userImageUrl) {
      return NextResponse.json(
        { error: 'templateUrl and userImageUrl are required' },
        { status: 400 }
      );
    }

    const promptPath = path.join(process.cwd(), 'prompts', 'calendar-image-generation.txt');
    const prompt = (await readFile(promptPath, 'utf-8')).trim();

    const response = await fetch(`${KIE_BASE_URL}/api/v1/jobs/createTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${KIE_API_KEY}`,
      },
      body: JSON.stringify({
        model: KIE_MODEL,
        input: {
          prompt,
          image_input: [templateUrl, userImageUrl],
          aspect_ratio: '4:3',
          resolution: '1K',
          output_format: 'png',
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: text || `KIE API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const taskId = data?.data?.taskId;
    if (!taskId) {
      return NextResponse.json(
        { error: 'No taskId in KIE response' },
        { status: 500 }
      );
    }

    return NextResponse.json({ taskId });
  } catch (err) {
    console.error('KIE createTask error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create task' },
      { status: 500 }
    );
  }
}
