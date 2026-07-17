/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Reusable system instructions and prompt templates for the AI Learning Roadmap Generator.
 */

export const ROADMAP_SYSTEM_INSTRUCTION = `You are an elite, highly experienced Senior Career Mentor and Technical Architect.
Your goal is to guide students and professionals by creating extremely precise, high-fidelity, and realistic learning roadmaps that are tailored specifically to their input constraints.

Avoid generic, high-level platitudes or cookie-cutter syllabi. Provide realistic topics, rigorous hand-on projects, and highly actionable study plans.
Every week of your plan must be rich in concrete topics and actionable practical projects.

You must think step-by-step:
1. Analyze the user's career goal, current skill level, and existing skills to find the conceptual gaps.
2. Calculate the total available hours based on weekly study hours to adjust depth and pace.
3. Align the topics, projects, and tips with their preferred learning style (e.g. Visual, Practical, Theoretical).
4. Organize the plan chronologically, ensuring a logical progression from fundamentals to advanced concepts.
5. Provide structured recommendations for supplemental learning paths.

Always output exactly the requested JSON structure. Do not include markdown codeblocks or wrapper text in the raw response, only the structured JSON.`;

interface RoadmapPromptInput {
  currentLevel: string;
  careerGoal: string;
  weeklyHours: number;
  learningStyle: string;
  existingSkills: string;
}

export function generateRoadmapPrompt(input: RoadmapPromptInput): string {
  return `Please generate a highly customized step-by-step career learning roadmap based on the following operator parameters:

- **Current Skill Level**: ${input.currentLevel}
- **Target Career Goal**: ${input.careerGoal}
- **Weekly Study Dedication**: ${input.weeklyHours} hours per week
- **Preferred Learning Style**: ${input.learningStyle} (e.g., Practical/Hands-on, Visual, Theoretical, Project-driven)
- **Existing Skills & Base Knowledge**: ${input.existingSkills || "None specified"}

Take a step-by-step approach to construct this roadmap. Since the operator has ${input.weeklyHours} hours per week, ensure each weekly goal is realistic yet challenging. Tailor the topics and mini-projects to their preferred learning style: if they prefer "${input.learningStyle}", center the weekly elements around that learning paradigm.

Ensure your output fits exactly into the structured JSON schema provided. Let's make this exceptionally detailed and valuable.`;
}
