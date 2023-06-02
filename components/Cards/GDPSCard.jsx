import {faAndroid, faApple, faWindows} from "@fortawesome/free-brands-svg-icons";
import {faArrowUpFromBracket, faDownload, faFloppyDisk, faGem, faLink, faZap} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function GDPSCard(props) {
    let bg = "var(--primary-color)"
    let hover = "blue-800"
    let icon = faArrowUpFromBracket
    switch (props.planid) {
        case 2:
            bg = "var(--success-color)"
            hover = "[green]"
            icon = faZap
            break
        case 3:
            bg = "magenta"
            hover = "[#a400a4]"
            icon = faGem
            break
    }

    return (
        <div className="col-span-2 md:col-span-2 mx-1 my-1.5 md:m-3 p-3 rounded-xl w-auto flex items-center" style={{backgroundColor: "var(--active-color)"}}>
            <img src={props.icon} className="rounded-lg h-20 mr-2" />
            <div className="">
                <h2 className="my-2">{props.name}</h2>
                <p className="m-0 text-gray-400 flex items-center gap-2">
                    {props.id} •
                    <span className={`text-white rounded-lg cursor-pointer flex gap-2 items-center group border-solid box-border border-2 hover:!border-${hover}`}
                          style={{borderColor: bg}} onClick={props.onClick}>
                        <FontAwesomeIcon icon={icon} className={`rounded-l-md p-1.5 aspect-square group-hover:!bg-${hover}`} style={{backgroundColor: bg}} />
                        <span className="inline pr-2 text-sm md:text-base">{props.plan}</span>
                    </span>
                </p>
            </div>
        </div>
    )
}

export function DownloadCard(props) {
    return (
        <div className="mx-1 my-1.5 md:m-3 p-3 rounded-xl w-auto md:w-fit" style={{backgroundColor: "var(--active-color)"}}>
            <span className="flex rounded-lg" style={{backgroundColor: "var(--primary-color)"}}>
                <a href={`https://gofruit.space/gdps/${props.srvid}`} target="_blank" rel="noreferrer" className="rounded-l-lg flex justify-center p-2 hover:bg-blue-800 cursor-pointer flex-1">
                    <FontAwesomeIcon icon={faDownload}/> <span className="ml-2 hidden md:inline">{props.locale.get('download')}</span>
                </a>
                    <span className="flex rounded-r-lg p-2 hover:bg-blue-800 cursor-pointer">
                        <FontAwesomeIcon icon={faLink}
                                         onClick={()=>{navigator.clipboard.writeText(`https://gofruit.space/gdps/${props.srvid}`);props.copyR()}}/>
                    </span>
            </span>
            <p className="text-center mb-1">{props.locale.get('platforms')}</p>
            <div className="flex justify-center rounded-lg bg-[var(--btn-color)]">
                {props.srv.clientWindowsURL && <FontAwesomeIcon className="rounded-lg p-2 hover:bg-[var(--primary-color)] cursor-pointer aspect-square" icon={faWindows}
                       onClick={()=>window.location.href=props.srv.clientWindowsURL}/>}
                {props.srv.clientAndroidURL && <FontAwesomeIcon className="rounded-lg p-2 hover:bg-[var(--primary-color)] cursor-pointer aspect-square" icon={faAndroid}
                       onClick={()=>window.location.href=props.srv.clientAndroidURL}/>}
                {props.srv.clientIOSURL && <FontAwesomeIcon className="rounded-lg p-2 hover:bg-[var(--primary-color)] cursor-pointer aspect-square" icon={faApple}
                       onClick={()=>window.location.href=props.srv.clientIOSURL}/>}
                {props.srv.clientMacOSURL &&  <img src="/macbook-48.png" className="rounded-lg h-[1.75em] p-0.5 hover:bg-[var(--primary-color)] cursor-pointer aspect-square"
                       onClick={()=>window.location.href=props.srv.clientMacOSURL} />}
            </div>

        </div>
    )
}