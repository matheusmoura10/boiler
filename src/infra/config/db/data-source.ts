import DataSourceProd from "./dataSourceProd";
import DataSourceLocal from "./dataSourceLocal";
import DataSourceTest from "./dataSourceTest";

export default process.env.NODE_ENV === "production"
    ? DataSourceProd
    : process.env.NODE_ENV === "test" ? DataSourceTest : DataSourceLocal;