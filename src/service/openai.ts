import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateInterview(keyword: string) {
  // 키워드 생성 전 db에 해당 키워드 존재하면 요청 x
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `당신은 시니어 개발자이자 면접관입니다. 주어진 개발 주제에 대해 구조화된 면접 질문과 답변을 제공해주세요.
          
          응답은 반드시 다음 구조의 유효한 JSON 형식이어야 하며, 모든 내용은 한글로 작성되어야 합니다:
          
          {
            "keyword": "검색 키워드",
            "description": "주제에 알아 보자는 문장 형식(1문장) ex: 자바스크립트의 클로저 개념에 대해 알아봅니다.",
            "level": 난이도(1: 초급, 2: 중급, 3: 고급),
            "tag": "JavaScript", "TypeScript", "React", "NextJS", "CSS", "HTML"중 하나 선택,
            "category": "frontend", "backend"중 하나 선택,
            "title": "면접 질문 제목 (명확하고 구체적으로)",
            "question": "실제 면접에서 물어볼 질문 형식으로 작성",
            "answer": "다음 구조로 상세한 답변을 작성:
             1. ### 개념 정의 (4-5문장으로 명확히)
              - 핵심 개념을 굵은 글씨(**bold**)로 강조하여 설명
              - 4-5개의 완성된 문장으로 구성
              - 실제 사례나 비유를 통한 이해하기 쉬운 설명 포함
              - 해당 개념이 중요한 이유와 배경 설명
             2. ### 동작 원리 (내부 작동 방식 상세 설명)
              - 내부 작동 방식의 단계별 상세 설명
              - 다이어그램이나 도식 활용 (가능한 경우)
              - 각 단계에서 발생하는 프로세스 설명
              - 실제 동작 시나리오 예시
             3. ### 주요 특징 (3-4가지 핵심 특징)
              - 3-4가지 핵심 특징 설명
              - 각 특징별 장단점 분석
              - 실무적 중요성 강조
             4. ### 기본 문법과 사용법 (기초적인 예제 코드 포함)
              - 기초적인 예제 코드 (주석 포함)
              - 일반적인 사용 패턴 설명
              - 기본 구문 설명
             5. ### 성능 고려사항
              - 주요 성능 이슈
              - 최적화 방법
              - 모니터링 방법
              모든 내용은 마크다운 형식으로 작성하며, 각 섹션을 명확히 구분할 것",
            "practicalUses": [
              "실제 활용 사례 (최소 3개, 최대 5개)",
            ],
            "commonMistakes": [
              "자주 하는 실수나 주의사항 (최소 2개, 최대 4개)",
            ],
            "relatedLinks": [
              "주제와 관련된 MDN, React 공식 문서 등 참고할만한 문서 URL (최소 1개)"
            ]
          }
          
          답변 작성 시 주의사항:
          1. answer는 반드시 코드 예제를 포함해야 하며, 마크다운 코드 블록으로 작성
          2. 실무 중심의 구체적인 예시 제공
          3. 답변은 단계적으로 설명하여 이해하기 쉽게 구성
          4. 최신 트렌드와 모범 사례를 반영
          5. 모든 답변은 실용적이고 구체적으로 작성할 것
          6. 이미지는 넣지 말 것
          7. 답변 처음에 자바스크립트의 실행 컨텍스트와 같은 제목(타이틀)은 포함하지 말 것
          8. 개념 정의, 동작 원리, 주요 특징, 기본 문법과 사용법, 성능 고려사항을 마크다운으로 보여줄때 헤더 크기를 ###으로 할것
          `,
        },
        {
          role: 'user',
          content: `${keyword}에 대한 면접 질문과 답변을 제공해주세요.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      response_format: { type: 'json_object' },
    });
    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error('No content in response');
    }
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate interview response');
  }
}
