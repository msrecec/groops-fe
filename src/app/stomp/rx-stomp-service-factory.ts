import {myRxStompConfig} from "./rx-stomp-config.config";
import {RxStompService} from "./rx-stomp.service";

export function rxStompServiceFactory() {
    const rxStomp = new RxStompService();
    // rxStomp.configure(myRxStompConfig);
    // rxStomp.activate();
    return rxStomp;
}
