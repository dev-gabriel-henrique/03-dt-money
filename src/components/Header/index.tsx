import * as Dialog from '@radix-ui/react-dialog'
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import Logo from "../../assets/Logo.svg";
import { NewTransactionModal } from '../NewTransactionModal';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} />
       <Dialog.Root>
        <Dialog.Trigger asChild>
       <NewTransactionButton>
        Nova Transação
        </NewTransactionButton>
        </Dialog.Trigger>
        <NewTransactionModal />
       </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
