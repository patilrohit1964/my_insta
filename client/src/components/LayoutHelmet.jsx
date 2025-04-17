import { Helmet } from "react-helmet"
const LayoutHelmet = ({ title, description, children }) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            {children}
        </div>
    )
}

export default LayoutHelmet