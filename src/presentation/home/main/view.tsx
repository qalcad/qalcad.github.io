import React from "react";
import BannerView from "@/presentation/home/banner/view";
import HeaderView from "@/presentation/home/header/view";
import ContainerView from "@/presentation/home/container/view";
import ContentView from "@/presentation/home/content/view";
import FooterView from "@/presentation/home/footer/view";

export default function View() {
  return (
    <>
      <BannerView />
      <ContainerView>
        <HeaderView />
        <div className="py-6 sm:py-8" />
        <ContentView />
      </ContainerView>
      <FooterView />
    </>
  );
}
