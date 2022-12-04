import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/common/parts/Container';

const footerLinkList = [
  { title: 'ホーム', link: '/' },
  { title: 'このサイトについて', link: '/' },
  { title: 'お問い合わせ', link: '/' },
  { title: 'プライバシーポリシー', link: '/' },
];

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-gray-50 py-4">
      <Container className="aliment-center md:flex justify-between items-center">
        <div className="justify-between text-center md:text-left">
          {/* ロゴ */}
          <Link href="/">
            <a>
              <Image src="/reapra-logo.png" width={130} height={50} alt="reapra" />
            </a>
          </Link>
        </div>
        <small className="mt-10 block text-center md:text-right">&copy; 2022 / Reapra Japan</small>
      </Container>
    </footer>
  );
};

export default Footer;
