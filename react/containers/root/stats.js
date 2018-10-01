/* eslint-disable */ 
    import {assignImportedComponents} from 'react-imported-component';
    const applicationImports = {
      0: () => import(/* webpackChunkName:'MarketReport' */'../pages/Home/sections/MarketReport'),
    };
    assignImportedComponents(applicationImports);
    export default applicationImports;