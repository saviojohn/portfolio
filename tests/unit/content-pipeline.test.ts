import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { 
  getAllProjects, 
  getAllBlogPosts, 
  getAllExperience 
} from '../../src/lib/content';

describe('Content Pipeline', () => {
  let existsSyncSpy: ReturnType<typeof vi.spyOn>;
  let readdirSyncSpy: ReturnType<typeof vi.spyOn>;
  let readFileSyncSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    existsSyncSpy = vi.spyOn(fs, 'existsSync');
    readdirSyncSpy = vi.spyOn(fs, 'readdirSync');
    readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAllProjects', () => {
    it('returns array of Project sorted featured first', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(['proj1.mdx', 'proj2.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      
      // proj1 is NOT featured, proj2 IS featured
      readFileSyncSpy.mockImplementation((pathStr: string | Buffer | URL | number) => {
        if (pathStr.toString().includes('proj1')) {
          return `---
title: "Project 1"
description: "Desc 1"
featured: false
publishedDate: "2023-01-01"
tags: ["React"]
---
Content 1`;
        }
        if (pathStr.toString().includes('proj2')) {
          return `---
title: "Project 2"
description: "Desc 2"
featured: true
publishedDate: "2023-01-02"
tags: ["Next.js"]
---
Content 2`;
        }
        return '';
      });

      const projects = getAllProjects();
      expect(projects.length).toBe(2);
      // Project 2 is featured, should be first
      expect(projects[0]?.slug).toBe('proj2');
      expect(projects[1]?.slug).toBe('proj1');
    });

    it('handles missing optional fields without throwing', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(['minimal.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      
      readFileSyncSpy.mockReturnValue(`---
title: "Minimal"
description: "Min desc"
---
content`);

      const projects = getAllProjects();
      expect(projects.length).toBe(1);
      expect(projects[0]?.featured).toBeFalsy();
    });
    
    it('malformed frontmatter throws an error', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(['bad.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      readFileSyncSpy.mockReturnValue(`---
title: "Bad
desc: [unclosed array
---
content`);

      // gray-matter throws on bad yaml
      expect(() => getAllProjects()).toThrow();
    });
  });

  describe('getAllBlogPosts', () => {
    it('returns [] when /content/blog/ is empty or nonexistent', () => {
      // simulate directory not existing by throwing error in readdirSync
      readdirSyncSpy.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });
      
      const posts = getAllBlogPosts();
      expect(posts).toEqual([]);
    });
  });

  describe('getAllExperience', () => {
    it('parses dates correctly', () => {
      existsSyncSpy.mockReturnValue(true);
      readdirSyncSpy.mockReturnValue(['job.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      
      readFileSyncSpy.mockReturnValue(`---
company: "Acme"
role: "Engineer"
startDate: "2021-01-01"
endDate: "2022-01-01"
---
content`);

      const exp = getAllExperience();
      expect(exp.length).toBe(1);
      expect(exp[0]?.startDate).toBe('2021-01-01');
    });
  });
});
