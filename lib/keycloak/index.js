import { accountUrl } from 'config';
import Keycloak from './keycloak';

const keycloak = new Keycloak({
  realm: 'master',
  clientId: 'palmap_open',
  url: `${accountUrl}/auth`,
});

export const TOKEN_REFRESH_INTERVAL = 3 * 1000;
export const TOKEN_MIN_VALIDITY = 30;

export default keycloak;
