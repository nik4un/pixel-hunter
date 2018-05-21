import { SOCIAL_GROUPS, DEVELOPMENT_YEAR } from '../data/constants';

export default `<footer class="footer">
  <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
  <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; ${DEVELOPMENT_YEAR}</span>
  <div class="footer__social-links">
    ${SOCIAL_GROUPS.map(({ name, shortName, link }) =>
    `<a href=${link} class="social-link  social-link--${shortName}">${name}</a>`).join(``)}
  </div>
</footer>`;
