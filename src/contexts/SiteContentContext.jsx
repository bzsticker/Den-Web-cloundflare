import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultSiteContent, mergeSiteContent } from '../data/defaultSiteContent.js';
import { fetchSiteContent } from '../services/siteContentService.js';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [remoteContent, setRemoteContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchSiteContent()
      .then((content) => {
        if (mounted) setRemoteContent(content);
      })
      .catch(() => {
        if (mounted) setRemoteContent(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      content: mergeSiteContent(defaultSiteContent, remoteContent),
      defaultContent: defaultSiteContent,
      loading,
      setRemoteContent,
    }),
    [loading, remoteContent],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const value = useContext(SiteContentContext);
  if (!value) {
    throw new Error('useSiteContent must be used inside SiteContentProvider');
  }
  return value;
}
