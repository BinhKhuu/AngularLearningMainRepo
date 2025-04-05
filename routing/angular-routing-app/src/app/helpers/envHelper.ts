export const getEnvMSALScopes = () =>{
    return import.meta.env['NG_APP_Scopes'].split(',');
}