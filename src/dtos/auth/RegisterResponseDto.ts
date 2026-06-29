import { TenantResponseDto } from "../tenent/TenantResponseDto";
import { ResponseUserDto } from "../user/ResponseUserDto";

export class ResponseRegisterDto {

    tenant!: TenantResponseDto;

    user!: ResponseUserDto;
}