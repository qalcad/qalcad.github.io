"use client";
import React from "react";
import BannerView from "@/presentation/home/banner/view";
import HeaderView from "@/presentation/home/header/view";
import ContainerView from "@/presentation/home/container/view";
import ContentView from "@/presentation/home/content/view";
import FooterView from "@/presentation/home/footer/view";
import { useTracking } from "@/presentation/common/tracking";
import { TRACKING_ID } from "@/core/constants";

export default function View() {
  useTracking({ trackingId: TRACKING_ID });
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
