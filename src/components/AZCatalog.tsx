import React from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const letterLinks: Record<string, string | null> = {
  A: 'https://drive.google.com/drive/folders/1oQgT8VjiQoTaOpXAdpGACwa_gIB-0eT2?usp=drive_link',
  B: 'https://drive.google.com/drive/folders/1iyPGLVDnF7gvs04EusvrVhwirKeuHYc4?usp=drive_link',
  C: 'https://drive.google.com/drive/folders/12OIWOf4EdfSBuBAs9J-iswlwmH54qbqQ?usp=drive_link',
  D: 'https://drive.google.com/drive/folders/1fUfTmIkdcWuR-_E289URTmR7USFPku9T?usp=drive_link',
  E: 'https://drive.google.com/drive/folders/1NCyf_9sENwW6Jqd94Ar2HcKPUprnrnS0?usp=drive_link',
  F: 'https://drive.google.com/drive/folders/16kHsNt7fGg51DrWnHUSyad9980njtCea?usp=drive_link',
  G: 'https://drive.google.com/drive/folders/1U0-u5ca96bwkFsDW1joyQWgAL_52Hw65?usp=drive_link',
  H: 'https://drive.google.com/drive/folders/1HkP94fZEuZZHLQsNp_UNXAjgmvETGxm7?usp=drive_link',
  I: 'https://drive.google.com/drive/folders/11KcgY-XDS7VLa5U5OMZJd_euQoQiu44G?usp=drive_link',
  J: 'https://drive.google.com/drive/folders/1t2O0Yqk_fJPaU3l2tziiIAVo3HIQaYLH?usp=drive_link',
  K: 'https://drive.google.com/drive/folders/150GZ9HjE3eO8Tr2HG_0ApTxIZxXyYcT4?usp=drive_link',
  L: 'https://drive.google.com/drive/folders/1Gr3drDIa5GzlIymgG-Zbco5KbbONHdI4?usp=drive_link',
  M: 'https://drive.google.com/drive/folders/1XgrKY-coVlwpj5CsdkLSd-GS9KPVDNUR?usp=drive_link',
  N: 'https://drive.google.com/drive/folders/1_7Hx_MeewwiEqp5HElaqZDPZFW-GgDo7?usp=drive_link',
  O: 'https://drive.google.com/drive/folders/17Y6QR8hWMd7X_alCBXKk5cOTXQrSbXXd?usp=drive_link',
  P: 'https://drive.google.com/drive/folders/1Q3964G7YlrsxK-E7Dy1kL50EPgYZSr7l?usp=drive_link',
  Q: 'https://drive.google.com/drive/folders/1Yh5L9l6ERLBV7YNPKfj70X5rsSfGXNZE?usp=sharing',
  R: 'https://drive.google.com/drive/folders/1eDXKl6IBWu1Dx6ws89GAZVewyICANSVn?usp=drive_link',
  S: 'https://drive.google.com/drive/folders/11_M3IXVkkK0ZyiYCuvBgAS30TsuP-wsi?usp=drive_link',
  T: 'https://drive.google.com/drive/folders/1aOOAKPKiRRdkJLct581u08a-FaqhwwRi?usp=drive_link',
  U: 'https://drive.google.com/drive/folders/1skEhcl-GlPfMn7IF_SyTHGv5gbRuToix?usp=drive_link',
  V: 'https://drive.google.com/drive/folders/1jcdDKUwXArumnHjDt2ahZjdcAOqMyEEg?usp=drive_link',
  W: 'https://drive.google.com/drive/folders/1n23N2jQnlEqXsx34C9HL1M2B4xK_jXl3?usp=drive_link',
  X: null,
  Y: null,
  Z: 'https://drive.google.com/drive/folders/1FiF1VT9diua64UYOMSf62MiK1VIwLHPl?usp=drive_link',
};

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const AZCatalog = () => {
  return (
    <section aria-labelledby="az-title" className="space-y-6">
      <header>
        <h2 id="az-title" className="text-2xl font-bold">Explore de A a Z</h2>
        <p className="text-muted-foreground">Navegue pelo catálogo por letra inicial.</p>
      </header>

      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3">
        {letters.map((ltr) => {
          const href = letterLinks[ltr] || null;
          const inner = (
            <div className="flex items-center justify-center h-12 md:h-14 font-semibold">
              {ltr}
              {href && <ExternalLink className="ml-1 h-4 w-4 opacity-60" />}
            </div>
          );

          return href ? (
            <a
              key={ltr}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir catálogo da letra ${ltr}`}
              className="focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            >
              <Card className="hover:shadow-md transition-shadow">
                {inner}
              </Card>
            </a>
          ) : (
            <Card
              key={ltr}
              className="opacity-60"
              aria-disabled="true"
              title="Sem link disponível"
            >
              {inner}
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default AZCatalog;
