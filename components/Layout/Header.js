import {
  AutoComplete,
  Dropdown,
  Input,
  Menu,
  Select,
  Skeleton,
  Space,
} from "antd";
import ImageWithFallback from "components/Common/ImageWithFallback";
import TopBar from "components/Common/TopBar";
import ArrowDropdown from "components/Icons/ArrowDropdown";
import EnFlag from "components/Icons/EnFlag";
import ViFlag from "components/Icons/ViFlag";
import { IMAGE_CDN_BASE_URL, MovieCountries } from "constants/config";
import { logoPath, siteName, siteUrl } from "constants/seo";
import requester from "lib/api/requester";
import { debounce, map, split, upperCase } from "lodash";

import { LogoJsonLd } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
const { Option } = Select;
const setLocale = (locale) => {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = "NEXT_LOCALE" + "=" + locale + ";" + expires + ";path=/";
};

const Languages = () => {
  const router = useRouter();
  const { locale, route, query } = router;

  return (
    <Select
      style={{ width: "100px" }}
      className="language-select"
      value={locale}
      dropdownClassName="custom-dropdown__options custom-dropdown__options--select-language"
      suffixIcon={<ArrowDropdown />}
    >
      <Option value="vi" key="vi">
        <Link
          href={{
            pathname: route,
            query,
          }}
          locale="vi"
        >
          <p
            className="text-white flex items-center font-semibold"
            onClick={() => setLocale("vi")}
          >
            {" "}
            <ViFlag /> VI
          </p>
        </Link>
      </Option>
      <Option value="en" key="en">
        <Link
          href={{
            pathname: route,
            query,
          }}
          locale="en"
        >
          <p
            className="text-white flex items-center font-semibold"
            onClick={() => setLocale("en")}
          >
            <EnFlag /> EN
          </p>
        </Link>
      </Option>
    </Select>
  );
};

export default function Header({ t }) {
  const router = useRouter();

  const items = useMemo(() => [
    {
      label: (
        <Link href={"/"}>
          <a
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
            aria-current="page"
          >
            {t("home")}
          </a>
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link href={"/genre"}>
          <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
            {t("genre")}
          </a>
        </Link>
      ),
      key: "genre",
    },
    {
      label: (
        <span
          role="button"
          className="block select-none py-2 pr-4 pl-3 border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
        >
          {t("country")}
        </span>
      ),
      key: "submenu",
      children: MovieCountries.map((country, index) => {
        return {
          label: (
            <Link href={`/country/${country}`}>
              <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                {upperCase(t(country))}
              </a>
            </Link>
          ),
          key: country,
        };
      }),
    },
    // {
    //     label: (<Link href={'/about'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{t('about-us')}</a></Link>),
    //     key: 'about'
    // },
    // {
    //     label: (<Link href={'/privacy'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{t('privacy')}</a></Link>),
    //     key: 'privacy'
    // },
    // {
    //     label: (<Link href={'/disclaimer'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{t('disclaimer')}</a></Link>),
    //     key: 'disclaimer'
    // },
    // {
    //     label: (<Link href={'/terms-of-service'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{t('terms-of-service')}</a></Link>),
    //     key: 'termsofservice'
    // },

    // {
    //     label: (<Link href={'/post?tab=news'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Blog</a></Link>),
    //     key: 'Blog'
    // },
    // {
    //     label: (<span role="button" className="block select-none py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Blog Categories</span>),
    //     key: 'submenu',
    //     children: [
    //         {
    //             label: (<Link href={'/blog/category/javascript'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Javascript</a></Link>),
    //             key: 'javascript'
    //         }
    //     ]
    // }
  ]);

  const mobileMenu = <Menu mode="vertical" theme="dark" items={items}></Menu>;

  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const [isLoading, setLoading] = useState(false);
  // const onSearch = debounce(async (value) => {

  //     if (value) {
  //         setLoading(true);
  //         const autoCompletes = await requester.getSync(`/search?select=title,id,img&q=${value}`);
  //         let autocompleteOpts = autoCompletes.map(el => ({ key: el.id, label: (<div key={el.id} className='complete-result flex items-center'><ImageWithFallback fallbackSrc={`${IMAGE_CDN_BASE_URL}/default_movie.png`} height={100} layout='fixed' objectFit='cover' width={100} src={el.img}/><h6 className='text-lg ml-5 font-semibold'>{el.title}</h6></div>),  value: el.title }))
  //         setAutoCompleteOptions(autocompleteOpts)
  //         setLoading(false);
  //     }
  //     else {
  //         setAutoCompleteOptions([]);
  //     }

  // }, 1000)

  const onSelect = async (value) => {
    router.push(`/search?q=${value}`, null, {
      shallow: false,
    });
  };
  return (
    <header>
      <TopBar content={t("we-are-doing-build-movie-database")} />
      <LogoJsonLd logo={"/logo.png"} url={siteUrl} />

      <nav className="header-nav border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">
            <a className="flex items-center">
              <Image
                width={50}
                height={50}
                src={logoPath}
                className="mr-3 h-6 sm:h-9"
                alt={`${siteName} logo`}
              />
              <h2 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {siteName}
              </h2>
            </a>
          </Link>

          <Input.Search
            onPressEnter={(ev) => {
              router.push(`/search?q=${ev.target.value}`);
            }}
            style={{
              width: "50%",
            }}
            onSearch={(value) => {
              router.push(`/search?q=${value}`);
            }}
            size="large"
            allowClear
            placeholder={t("search-placeholder")}
          ></Input.Search>
          {/* <AutoComplete
                    
                    dropdownClassName='completion-search-dropdown lg:w'
                        dropdownMatchSelectWidth={500}
                        options={autoCompleteOptions} 
                        onSearch={onSearch}
                        onSelect={onSelect}
                        bordered
                        notFoundContent={isLoading ? <Skeleton avatar paragraph={{ rows: 4 }} /> : 'No movie found for this query!'}
                        style={{
                            width: '50%',
                        }}
                    >
                        <Input.Search onSearch={(value) => {router.push(`/search?q=${value}`)}} size='large' allowClear placeholder="Search by name, director, cast..." ></Input.Search>
                    </AutoComplete> */}
          {/* <div className="flex items-center lg:order-2">
                    <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div> */}
        </div>
        <div className="justify-between flex items-center mt-5 menu-header-wrap lg:flex lg:w-auto lg:order-1">
          <Dropdown
            trigger={"click"}
            autoFocus={true}
            className="menu-header-mobile"
            overlay={mobileMenu}
          >
            <Space>
              <div className="flex items-center lg:order-2">
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  className="inline-flex select-none items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </Space>
          </Dropdown>
          <Menu
            className="menu-header-desktop"
            theme="dark"
            items={items}
            mode="horizontal"
          ></Menu>
          <Languages />
          {/* <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
<li>
    <Link href={'/'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a></Link>
</li>
<li>
    <Link href={'/questions?tab=news'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Questions</a></Link>
</li>
<li>
    <Link href={'/post?tab=news'}><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Blog</a></Link>
</li>
<li>
    <Link href="#"><a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Blog Categories</a></Link>
</li>
</ul> */}
        </div>
      </nav>
    </header>
  );
}
