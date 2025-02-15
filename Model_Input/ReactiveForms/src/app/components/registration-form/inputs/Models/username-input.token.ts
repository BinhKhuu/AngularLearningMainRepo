import { Component, InputSignalWithTransform } from "@angular/core";

export abstract class UsernameInputToken {
    abstract username: InputSignalWithTransform<string, string>
}
