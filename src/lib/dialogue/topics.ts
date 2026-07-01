export type Topic = 'neutral' | 'frontend' | 'architecture' | 'ai' | 'philosophy' | 'contact';

export function getTopicForNode(nodeId: string): Topic {
  if (nodeId.startsWith('A')) return 'frontend'; // Recruiter nodes
  if (nodeId.startsWith('B')) return 'architecture'; // CTO nodes
  if (nodeId.startsWith('C')) return 'philosophy'; // Founder nodes
  if (nodeId.startsWith('D')) return 'ai'; // Explorer/AI nodes
  if (nodeId === 'CONTACT') return 'contact';
  return 'neutral'; // ROOT or others
}
