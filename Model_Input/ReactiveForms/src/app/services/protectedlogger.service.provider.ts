import { ILogger } from "./ILogger";
import { ProtectedloggerService } from "./protectedlogger.service";
import { UserserviceService } from "./userservice.service";

export const protectedLoggerServiceFactory = (userService: UserserviceService) => {
    return new ProtectedloggerService(userService.isUserAuthorized());
}
