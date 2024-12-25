"use client";
import React from "react";
import HeaderView from "@/presentation/about/header/view";
import ContentView from "@/presentation/about/content/view";
import FooterView from "@/presentation/home/footer/view";
import ContainerView from "@/presentation/about/container/view";
import BannerView from "@/presentation/home/banner/view";
import { TRACKING_ID } from "@/core/constants";
import { useTracking } from "@/presentation/common/tracking";

export default function View() {
  useTracking({ trackingId: TRACKING_ID });
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
