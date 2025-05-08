"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { RiUser5Line } from "@react-icons/all-files/ri/RiUser5Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";

import { GoogleOAuthService } from "@/services/oauth";
import { AuthService } from "@/services/auth";
import { UserQueries } from "@/services/user/queries/userQueries";
import { IconBox } from "@/components/common/iconBox";

import styles from "./loginBox.module.scss";

const LOGIN_TYPES = ["소셜 로그인", "테스트 계정"];

export const LoginBox = ({ className }: { className?: string }) => {
  const [tab, setTab] = useState(LOGIN_TYPES[1]);

  return (
    <div className={`${styles.container} ${className}`}>
      <section className="flex-row">
        {LOGIN_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setTab(type)}
            className={`${type === tab && "main-button"}`}
          >
            <IconBox>{type}</IconBox>
          </button>
        ))}
      </section>

      <section
        className={styles.loginLayout}
        style={{
          ...(tab === LOGIN_TYPES[1] && { flexDirection: "row-reverse" }),
        }}
      >
        <motion.section layoutId="login" className={styles.loginSection}>
          {tab === LOGIN_TYPES[0] && <OAuthAccount />}
          {tab === LOGIN_TYPES[1] && <TestAccount />}
        </motion.section>

        <section className={styles.subSection}>
          {tab}
          <RiGroupLine />
        </section>
      </section>
    </div>
  );
};

const TestAccount = () => {
  const queryClient = useQueryClient();

  return (
    <>
      <p>임시 제공하는 계정을 통해 Cookidge 서비스를 체험하세요!</p>
      <button
        onClick={async () => {
          await AuthService.testAccountLogin("5789");
          queryClient.invalidateQueries({ queryKey: UserQueries.keys.me });
        }}
      >
        <IconBox Icon={RiUser5Line}>테스트 계정으로 로그인</IconBox>
      </button>
    </>
  );
};

const OAuthAccount = () => {
  return (
    <>
      <p>계정에 로그인하여 다양한 서비스를 경험하세요!</p>
      <button
        onClick={() => {
          GoogleOAuthService.login();
        }}
      >
        <IconBox Icon={FcGoogle}>구글 계정으로 로그인</IconBox>
      </button>
    </>
  );
};
