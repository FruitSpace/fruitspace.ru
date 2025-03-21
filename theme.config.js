import GlobalNav from "@/components/GlobalNav";
import Footer from "@/components/Global/Footer";



export default {
    logo: <span>Fruitspace</span>,
    useNextSeoProps: ()=>({
        titleTemplate: '%s | Документация FruitSpace',
    }),
    // darkMode: true,
    nextThemes: {
        defaultTheme: "dark",
        forcedTheme: "dark"
    },
    primaryHue: {
        dark: 210,
    },
    navbar: {
        component: <GlobalNav mainpage />
    },
    footer: {
        component: <Footer />
    },
    themeSwitch: {
        component: null
    },
    feedback: {
        content: null
    },
    editLink: {
        component: null
    }
}