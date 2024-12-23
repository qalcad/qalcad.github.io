import React from "react";
import HeaderView from "@/presentation/about/header/view";
import ContentView from "@/presentation/about/content/view";
import FooterView from "@/presentation/home/footer/view";
import ContainerView from "@/presentation/about/container/view";
import BannerView from "@/presentation/home/banner/view";

export default function View() {
  return (
    <>
      <BannerView />
      <ContainerView>
        <HeaderView />
        <ContentView />
      </ContainerView>
      <FooterView />
    </>
  );
}
