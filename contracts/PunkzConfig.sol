// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.16;

library PunkzConfig {
    enum Skin {
        ReptilianAncientDragon,
        ReptilianSpace,
        ReptilianRegular,
        AlienSpace,
        AlienCrypto,
        AlienOcean,
        AlienStar,
        DeadSkinSkullAncient,
        DeadSkinSkullBone,
        DeadSkinSkullCristal,
        DeadSkinSkullGolden,
        DeadSkinSkullZombieUltra,
        DeadSkinSkullZombieRegular,
        ApeAlvin,
        ApeBio,
        ApeDark,
        ApeFury,
        ApeIce,
        ApeLuxy,
        ApeZombie,
        HumanGolden,
        HumanA,
        HumanB,
        HumanC
    }

    enum Mouth {
        None,
        Boca1,
        Boca2,
        Boca3,
        Boca4,
        Boca5,
        Boca6,
        Boca7,
        Boca8,
        Boca9,
        Boca10,
        Boca11,
        Boca12,
        Boca13,
        Boca14,
        Boca15,
        Boca16,
        Boca17,
        Boca18
    }

    enum Eyes {
        None,
        BoredEyes,
        CrazyEyes,
        CyborgEyes,
        DangerEyes,
        DarkEyes,
        DeadEyes,
        DeepEyes,
        Eyes,
        EyesV2,
        EyesV3,
        EyesV4,
        EyesV5,
        EyesV6,
        EyesV7,
        FucsiaReptilianEyes,
        GoldenReptilianEyes,
        GreenReptilianEyes,
        SkyReptilianEyes
    }

    enum EyeColor {
        None,
        D3,
        BicolorV1,
        BicolorV2,
        BicolorV3,
        Brown,
        Dark,
        Diamond,
        Emerald,
        Golden,
        Green,
        Light,
        Ocean,
        Pink,
        Purple,
        Red,
        Rose,
        Space
    }

    enum EyeBrows {
        None,
        BlackEyebrows,
        BlackLongEyebrows,
        BlackUnibrow,
        BlondEyebrows,
        BlondLongEyebrows,
        BlondUnibrow,
        BrownEyebrows,
        BrownLongEyebrows,
        BrownUnibrow,
        GrayEyebrows,
        GrayLongEyebrows,
        GrayUnibrow,
        GreenEyebrows,
        GreenLongEyebrows,
        GreenUnibrow,
        PurpleEyebrows,
        PurpleLongEyebrows,
        PurpleUnibrow,
        Reptilian,
        RoseEyebrows,
        SpaceEyebrows,
        SpaceLongEyebrows,
        SpaceUnibrow
    }

    enum Hair {
        None,
        Hair1,
        Hair2,
        Hair3,
        Hair4,
        Hair5,
        Hair6,
        Hair7,
        Hair8,
        Hair9,
        Hair10,
        Hair11,
        Hair12,
        Hair13,
        Hair14,
        Hair15,
        Hair16,
        Hair17,
        Hair18,
        Hair19,
        Hair20,
        Hair21,
        Hair22,
        Hair23,
        Hair24,
        Hair25,
        Hair26,
        Hair27,
        Hair28,
        Hair29,
        Hair30,
        Hair31,
        Hair32,
        Hair33,
        Hair34,
        Hair35,
        Hair36,
        Hair37
    }

    enum Nose {
        None,
        Nose1,
        Nose2,
        Nose3,
        Nose4,
        Nose5,
        Nose6,
        Nose7,
        Nose8,
        Nose9,
        Nose10,
        Nose11
    }

    enum Beard {
        None,
        BlackBeardV11,
        BlackBeardV7,
        BlueBeardV11,
        BlueBeardV4,
        BlueBeardV6,
        BrownBeardV10,
        BrownBeardV11,
        BrownBeardV12,
        BrownBeardV4,
        BrownBeardV8,
        GrayBeardV11,
        GrayBeardV3,
        GrayBeardV4,
        GrayBeardV7,
        GrayBeardV9,
        GreenBeardV1,
        GreenBeardV12,
        GreenBeardV3,
        OceanBeardV5,
        PinkBeardV7,
        RoseBeardV11,
        RoseBeardV12,
        RoseBeardV2,
        RoseBeardV3,
        RoseBeardV6,
        SakuraBeardV10,
        SakuraBeardV8,
        SandBeardV5,
        SkyBeardV11,
        SkyBeardV12,
        SkyBeardV4,
        SkyBeardV9,
        WhiteBeardV11,
        YellowBeardV2
    }

    enum Tongue {
        None,
        AlienSnakeTongue,
        AlienTongue,
        AlienVenomTongue,
        GreenSnakeTongue,
        GreenTongue,
        GreenVenomTongue,
        PurpleSnakeTongue,
        RoseTongue,
        Tongue,
        VenomTongue,
        WhiteTongue
    }

    enum Background {
        None,
        Background0x0b0b0b,
        Background0x6b86ff,
        Background0x6be7ff,
        Background0x99ffc2,
        Background0x706bff,
        Background0xb5fbff,
        Background0xcabaff,
        Background0xe9e9e9,
        Background0xff6bcc,
        Background0xff99dc,
        Background0xff9441,
        Background0xfffeb5
    }

    enum Clothing {
        None,
        BeigeSuit,
        BlackJacket,
        BloodHoodie,
        CloudJacket,
        DarkHoodie,
        DarkJacket,
        DeepHoodie,
        GrayHoodie,
        GrayLeatherJacket,
        GreenChessSweatshirt,
        GreenChessSweatshirtV2,
        LabCoat,
        MagmaRetroJacket,
        MoonJacketV2,
        MoonLeatherJacket,
        ParadoxNinjaVest,
        PinkChessSweatshirt,
        PunkRetroJacket,
        RainbowLeatherJacket,
        RedJacketV2,
        RedNinjaVest,
        RetroSweatshirt,
        RoseJacket,
        RoseSuit,
        SakuraJacket,
        SakuraLeatherJacket,
        SakuraNinjaVest,
        SakuraSweatshirt,
        SkyHoodie,
        SkyJacket,
        SkyLeatherJacket,
        SkyRetroJacket,
        SpaceLabCoat,
        SpaceSweatshirt,
        Suit,
        SunriseSweatshirt,
        WhiteHoodie,
        WhiteJacket,
        WhiteNinjaVest
    }

    enum Cap {
        None,
        ArcticCap,
        ArticKnittedCap,
        ArticTruckerHat,
        BlackCap,
        BlackClassicCap,
        BlackHeadBandana,
        BlackTruckerHat,
        Cap6,
        Cap7,
        Cap8,
        DarkCrown,
        DarkNinjaHeadbandV2,
        DiamondCrown,
        FucsiaNinjaHeadband,
        GoldCrown,
        GrayKnittedCap,
        GrayNinjaHeadband,
        HatV1,
        HatV2,
        KryptonCrown,
        LuxyHeadband,
        MilitaryCap,
        MilitaryHeadBandana,
        MoonCrown,
        NinjaHeadband,
        NinjaHeadbandV2,
        PinkKnittedCap,
        RedBandana,
        RedClassicCap,
        RedHeadband,
        RedHeadBandana,
        RedKnittedCap,
        RetroHeadband,
        RoyalCrown,
        TurquoiseBandana,
        TurquoiseHeadBandana,
        TurquoiseKnittedCap,
        WhiteCap,
        WhiteHeadband,
        WhiteKnittedCap,
        WhiteNinjaHeadbandV2,
        White_RedClassicCap
    }

    enum Chain {
        None,
        DarkChain,
        DiamondChain,
        DiamondChainV2,
        EmeraldChainV2,
        FucsiaChain,
        FucsiaChainV2,
        GoldChain,
        GoldChainV2,
        GoldenChainV2,
        LightChain,
        LightChainV2,
        MoonChain,
        RubyChain
    }

    enum Cigar {
        None,
        BlackCigar,
        BloodDarkCigar,
        BloodSmokingPipe,
        BlueCigar,
        Cigar,
        CigarV2,
        CloudSmokingPipe,
        DarkSmokingPipe,
        EmeraldCigar,
        FucsiaDarkCigar,
        FucsiaSmokingPipe,
        GangstaCigar,
        GoldSmokingPipe,
        GreenCigar,
        GreenDarkCigar,
        GreenSmokingPipe,
        LabSmokingPipe,
        MagentaSmokingPipe,
        OceanCigar,
        OceanSmokingPipe,
        OrangeCigar,
        PurpleCigar,
        PurpleCigarV2,
        PurpleSmokingPipe,
        SeaSmokingPipe,
        SkyCigar,
        SkyDarkCigar,
        SmokingPipe,
        SnowDarkCigar,
        SpaceDarkCigar,
        VenomSmokingPipe,
        WeedSmokingPipe,
        YellowCigar
    }

    enum Earring {
        None,
        DiamondEarring,
        DiamondEarringV2,
        EmeraldEarring,
        EmeraldEarringV2,
        FucsiaEarring,
        FucsiaEarringV2,
        GoldEarring,
        GoldEarringV2,
        GoldenEarring,
        GoldenEarringV2,
        GreenEarring,
        GreenEarringV2,
        LilacEarring,
        LilacEarringV2,
        OceanEarring,
        OceanEarringV2,
        PurpleEarring,
        PurpleEarringV2,
        RubyEarring,
        RubyEarringV2
    }

    enum Glasses {
        None,
        D3Glasses,
        BlueScouter,
        BlueTranslucentGlasses,
        BlueTranslucentGlassesV2,
        ChessGlasses,
        ClassicGlasses,
        EyePatch,
        FancySunglasses,
        FuturisticSunglasses,
        Glasses,
        GlassesV2,
        GlassesX,
        GreenScouter,
        GreenTranslucentGlasses,
        HappyVRHeadset,
        LilacScouter,
        LilacTranslucentGlasses,
        PinkGlasses,
        RainbowSunglasses,
        RedTranslucentGlasses,
        RetroSunglasses,
        RoseScouter,
        RoseTranslucentGlasses,
        Sunglasses,
        SunglassesV2,
        VRHeadset
    }

    enum Mask {
        None,
        AlienMask,
        CatMask,
        EmeraldGasMask,
        GasMask,
        HollowMask,
        IronMask,
        ReptilianMask,
        SilverCyborgMask,
        TerminatorMask,
        WhiteGasMask
    }

    struct FixedConfig {
        Skin skin;
        Mouth mouth;
        EyeColor eyeColor;
        Eyes eye;
        EyeBrows eyeBrows;
        Hair hair;
        Nose nose;
        Beard beard;
        Tongue tongue;
    }

    struct ItemsConfig {
        Background background;
        Clothing clothing;
        Cap cap;
        Chain chain;
        Cigar cigar;
        Earring earring;
        Glasses glasses;
        Mask mask;
    }
}
