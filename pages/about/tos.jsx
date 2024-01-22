import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import Link from "next/link";
import {Chip} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import {useGlobalLocale} from "../../locales/useLocale";

export default function Tos(props) {

    const localeGlobal = useGlobalLocale(props.router)

    return <>
        <GlobalHead title={localeGlobal.get('navName')}/>
        {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
        <GlobalNav />
        <div className={styles.main}>
            <div className={styles.innerMain}>
                <h2>Пользовательское соглашение</h2>
                <h3>1. Терминология</h3>
                <ol className={styles.utable}>
                    <li><strong>Хостинг</strong> - сервис FruitSpace.</li>
                    <li><strong>Клиент</strong> - физическое лицо, заключившее с
                        провайдером договор.
                    </li>
                    <li><strong>Игрок</strong> - конечный потребитель, прямо или косвенно использующий услуги хостинга.
                    </li>
                    <li><strong>Пользователь</strong> - игрок или клиент.</li>
                </ol>
                <h3>2. Условия и порядок предоставления услуг</h3>
                <ol className={styles.utable}>
                    <li>Пользуясь услугами хостинга пользователь подтверждает факт
                        владения лицензионной копией игры для выбранного приватного сервера.
                    </li>
                    <li>Все серверы использует ПО с закрытым исходным кодом, принадлежащее FruitSpace. Хостинг вправе
                        изменять его без уведомления пользователей.
                    </li>
                    <li>Запрещена перепродажа серверов и посредничество при продаже</li>
                    <li>Мы вправе отказать в обслуживании клиента, нарушающего настоящие
                        условия использования, а также заблокировать его аккаунт и удалить его приватные серверы без
                        возврата средств.
                    </li>
                    <li>Мы вправе заблокировать аккаунт клиента и удалить его приватные
                        серверы без возврата средств по жалобе со стороны третьих лиц и непринятию клиентом мер по
                        поступившей жалобе.
                    </li>
                    <li>При подключении опции «Автопродление» клиент дает разрешение
                        хостингу списывать денежные средства с баланса в личном кабинете в сумме необходимой для
                        активации услуг(и) с учетом имеющегося остатка денежных средств.
                    </li>
                    <li>Услуги хостинга предоставляются «как есть», хостинг оставляет за
                        собой право пересмотреть правила предоставления услуг, в том числе ценовую политику и
                        характеристики тарифов в любой момент, без предварительного уведомления и в одностороннем
                        порядке, новые правила вступают в действие в момент опубликования их на официальном сайте
                        хостинга.
                    </li>
                    <li>Запрещено размещение информации, противоречащей и/или
                        запрещенной законодательством РФ, законом об авторских и смежных правах.
                    </li>
                </ol>
                <h3>3. Политика оплаты и возврата</h3>
                <ol className={styles.utable}>
                    <li>Исполнитель не платит НДС, так как применяет упрощённую систему
                        налогообложения.
                    </li>
                    <li>Стоимость услуг указана на <Link href="/" passHref style={{color: "#0d6efd", textDecoration: "none"}}>Главной странице</Link>, а также на
                    страницах услуг.</li>
                    <li>Клиенты оплачивают услуги по безналичному расчёту через
                        сторонние мерчант-сервисы «Qiwi» и «Ю.Касса».
                    </li>
                    <li>Возврат денежных средств возможен только в случае
                        неработоспособности сервера по вине хостинга и за фактически неиспользованные дни.
                    </li>
                    <li>Возврат средств осуществляется в течение 45 рабочих дней на
                        счет, с которого производилась оплата.
                    </li>
                    <li>Для возврата средств необходимо написать письмо запрос в
                        поддержку с темой «Возврат средств» по адресу support@fruitspace.one
                    </li>
                </ol>
                <h3>4. Ответственность сторон</h3>
                <ol className={styles.utable}>
                    <li>Мы не несем ответственности за утерю данных, взлом или нарушение
                        работы приватного сервера в результате халатности пользователя.
                    </li>
                    <li>Досудебный порядок урегулирования споров в течение 30 дней обязателен.</li>
                    <li>Все плановые технические работы, обновления и тому подобные
                        мероприятия проводятся с 22:00 до 02:00 следующего дня по московскому времени. К этому
                        пункту не относятся форс-мажорные ситуации и внеплановые работы.
                    </li>
                    <li>Подсудность неурегулированных споров — суд Воронежской области.</li>
                </ol>
            </div>

            <div className={styles.innerMain} >
                <h3>Контакты</h3>
                <div className={`${styles.contactBox} ${styles.MrWhite}`}>
                    <Chip icon={<EmailIcon />} label="support@fruitspace.one" variant="outlined" />
                    <span style={{padding:"0 .5rem"}} />
                    <Chip icon={<PhoneIcon />} label="+2 597 064 (факс)" variant="outlined" />
                    <span style={{padding:"0 .5rem"}} />
                    <Chip icon={<ReceiptIcon />} label="ИНН: 366416455929" variant="outlined" />
                    <span style={{padding:"0 .5rem"}} />
                    <Chip icon={<PersonIcon />} label="ФИО: Фоминых Александр Михайлович" variant="outlined" />
                </div>
            </div>
        </div>
        <Footer router={props.router}/>
    </>;
}