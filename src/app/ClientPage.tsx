'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDialogue } from '../hooks/useDialogue';
import { decodePathFromURL } from '../lib/dialogue/engine';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PrismOpening } from '../components/dialogue/PrismOpening';
import { SplitScreen } from '../components/dialogue/SplitScreen';
import { ConversationHistory } from '../components/dialogue/ConversationHistory';
import { DialogueStatement } from '../components/dialogue/DialogueStatement';
import { ChoiceBlock } from '../components/dialogue/ChoiceBlock';
import { ProjectShowcase } from '../components/content/ProjectShowcase';
import { Undercurrent } from '../components/canvas/Undercurrent';
import { getTopicForNode } from '../lib/dialogue/topics';
import type { Project } from '../lib/types';

interface ClientPageProps {
  allProjects: Project[];
}

function DialogueInterface({ allProjects }: { allProjects: Project[] }) {
  const { currentNode, choose } = useDialogue();
  const searchParams = useSearchParams();
  const { path, loadPath, isLoading } = useDialogue();

  useEffect(() => {
    const urlPath = searchParams.get('path');
    if (urlPath) {
      const decoded = decodePathFromURL(urlPath);
      if (decoded.length > 0) {
        loadPath(decoded);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (isLoading) return null;

  const isAtRoot = path.length === 1 && currentNode.id === 'ROOT';
  const currentTopic = getTopicForNode(currentNode.id);

  return (
    <>
      <Undercurrent topic={currentTopic} />
      <Header />
      {isAtRoot ? (
        <PrismOpening />
      ) : (
        <SplitScreen 
          depth={path.length}
          sidebarContent={<ConversationHistory />}
          mobilePathContent={<ConversationHistory />}
          leftContent={
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <DialogueStatement text={currentNode.text} animate={true} />
              {currentNode.choices && (
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)' }}>
                  {currentNode.choices.map((choice, i) => (
                    <ChoiceBlock 
                      key={choice.id} 
                      choice={choice} 
                      index={i} 
                      onSelect={(c) => choose(c.leadsTo)} 
                    />
                  ))}
                </div>
              )}
            </div>
          }
          rightContent={
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
              {currentNode.contentFilter && currentNode.contentFilter.type === 'project' && (
                <ProjectShowcase filter={currentNode.contentFilter} projects={allProjects} />
              )}
              {currentNode.contentFilter && currentNode.contentFilter.type === 'blog' && (
                <div style={{ color: 'var(--color-text-secondary)' }}>[Blog entries rendered here based on tags: {currentNode.contentFilter.tags?.join(', ')}]</div>
              )}
              {currentNode.contentFilter && currentNode.contentFilter.type === 'experiment' && (
                <div style={{ color: 'var(--color-text-secondary)' }}>[Experiments rendered here based on tags: {currentNode.contentFilter.tags?.join(', ')}]</div>
              )}
            </div>
          }
        />
      )}
      <Footer />
    </>
  );
}

export default function ClientPage({ allProjects }: ClientPageProps) {
  return (
    <React.Suspense fallback={null}>
      <DialogueInterface allProjects={allProjects} />
    </React.Suspense>
  );
}
