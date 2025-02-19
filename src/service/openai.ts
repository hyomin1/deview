import { exampleAnswer } from '@/app/constants/interview';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateInterview(keyword: string) {
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
            "tag": "JavaScript", "TypeScript", "React", "NextJS", "CSS", "HTML", "Network", "Browser"중 하나 선택,
            "category": "frontend"중 하나 선택,
            "title": "면접 질문 제목 (명확하고 구체적으로)",
            "question": "실제 면접에서 물어볼 질문 형식으로 작성",
            "answer": "다음 예시와 같은 형식으로 작성해주세요: ${exampleAnswer}",
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

export default async function reviewDocument(
  text: string,
  instruction: string
) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `당신은 대한민국의 채용 시장을 완벽히 이해하는 자기소개서 전문가입니다.
      
      특징:
      - 각 기업의 인재상과 직무 특성을 정확히 파악
      - 지원자의 경험을 가장 효과적인 방식으로 표현
      - AI 답변 같지 않은 자연스러운 문체 구사
      - 현실적이고 구체적인 경험 위주로 작성
      
      다음과 같은 요청을 완벽히 수행할 수 있습니다:
      1. 자기소개서 작성/수정
         - 글자 수 제한에 맞춘 작성
         - 특정 역량/경험 중심 서술
         - 직무/기업별 맞춤 작성
         - 기존 내용 보완/발전
      
      2. 면접 대비 포인트
         - 자소서 기반 예상 질문
         - 답변 시 주의사항
         - 더 어필할 수 있는 포인트
      
      작성 시 반드시 포함할 요소:
      - 정량적 성과 (수치, 등급, 순위 등)
      - 구체적인 경험과 에피소드
      - 역량과 성과의 인과관계
      - 지원동기와 포부의 진정성
      - 해당 직무만의 차별화된 키워드
      
      피해야 할 내용:
      - 추상적인 표현
      - 검증 불가능한 주장
      - 과도하게 꾸민 내용
      - 진부한 표현
      
      사용자의 요청에 따라 첨삭, 작성, 분석 등 최적의 방식으로 답변하되, 
      항상 실전에서 합격할 수 있는 퀄리티를 유지합니다.`,
      },
      {
        role: 'user',
        content: `${instruction}\n\n${text}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error('No content in response');
  }
  return content;
}
