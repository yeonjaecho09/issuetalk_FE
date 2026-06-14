import { MessageCircle } from 'lucide-react';
import { Copyright, Footer, FooterBrand, FooterCaption, FooterContainer, FooterContent, FooterIcon, FooterText, FooterTitle } from './Layout.styles';

export function LayoutFooter() {
  return (
    <Footer>
      <FooterContainer>
        <FooterContent>
          <FooterBrand>
            <FooterIcon>
              <MessageCircle size={16} />
            </FooterIcon>
            <FooterText>
              <FooterTitle>IssueTalk</FooterTitle>
              <FooterCaption>관심 있는 이슈를 모으고 선명하게 나누는 토론 플랫폼</FooterCaption>
            </FooterText>
          </FooterBrand>
          <Copyright>© 2026 IssueTalk. 더 나은 공론장 문화를 만듭니다.</Copyright>
        </FooterContent>
      </FooterContainer>
    </Footer>
  );
}
