interface MarkdownData {
  title: string;
  description: string;
  imagePath: string;
  content: string;
}

export function generateMarkdown({
  title,
  description,
  imagePath,
  content
}: MarkdownData): string {
  return `---
title: "${title}"
description: "${description}"
date: ${new Date().toISOString()}
image: "${imagePath}"
---

${content}`;
}