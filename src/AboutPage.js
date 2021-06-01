import React from 'react';
import { useTranslation } from 'react-i18next';

// renders the About page
function aboutPage () {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <h2>{t('About.AdditionalDetails')}</h2>
      <p>
        {t('About.Paragraph1')}
        <a href="https://techmatters.org/project/1000-landscapes/">
          {t('About.Here')}
        </a>
      </p>
      <p>
        {t('About.Paragraph2')}
        <a href="https://github.com/Murphstarr/content-prototype">
          {t('About.Here')}
        </a>
      </p>
    </React.Fragment>
  );
}

export default aboutPage;