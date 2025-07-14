# Prompt Engineering Rules

## Introduction
This guide provides best practices for designing, testing, and refining prompts for AI-powered features. It is intended for developers integrating LLMs (like OpenAI, Anthropic, or Gemini) into web applications.

## General Principles
- **Clarity:** Write prompts that are clear, specific, and unambiguous.
- **Context:** Provide relevant context and examples in the prompt to guide the model.
- **Instruction:** Use explicit instructions (e.g., “List 5…”, “Summarize the following…”).
- **Format:** Specify the desired output format (e.g., JSON, Markdown, plain text).
- **Iterate:** Test and refine prompts based on real outputs and user feedback.

## Types of Prompts
- **Zero-shot:** No examples, just instructions.
- **Few-shot:** Include 1–3 examples to guide the model.
- **Chain-of-thought:** Ask the model to reason step-by-step.
- **Role-based:** Assign a persona or role to the model for more targeted responses.

## Testing & Evaluation
- Maintain a prompt library with effective prompts and their results.
- Test prompts with edge cases and real user data.
- Document prompt changes and their impact on results.

## Security & Ethics
- Avoid prompts that could elicit sensitive or harmful outputs.
- Sanitize user input before including it in prompts.
- Log and review AI outputs for quality and safety.

## References
- https://platform.openai.com/docs/guides/prompt-engineering
- https://anthropic.com/prompt-engineering
- https://www.promptingguide.ai/
