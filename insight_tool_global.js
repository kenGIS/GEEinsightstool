/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var WAPOR_Actual = ee.ImageCollection("FAO/WAPOR/2/L1_AETI_D"),
    WAPOR_Daily = ee.ImageCollection("FAO/WAPOR/2/L1_RET_E"),
    GOES_16_FDCF = ee.ImageCollection("NOAA/GOES/16/FDCF"),
    GOES_17_FDCF = ee.ImageCollection("NOAA/GOES/17/FDCF"),
    PERSIANN_CDR = ee.ImageCollection("NOAA/PERSIANN-CDR"),
    CHIRPS_Daily = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    GSMaP = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational"),
    countries = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    LGPP = ee.ImageCollection("UMT/NTSG/v2/LANDSAT/GPP"),
    MGPP = ee.ImageCollection("UMT/NTSG/v2/MODIS/GPP"),
    S5_CO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO"),
    S5_CH4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4"),
    S5_SO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2"),
    S5_NO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2"),
    GRIDMET_D = ee.ImageCollection("GRIDMET/DROUGHT"),
    S5_NO2_OFF = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2"),
    S5_SO2_OFF = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_SO2"),
    S5_CO_OFF = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO"),
    FIRMS = ee.ImageCollection("FIRMS"),
    MOD_T_BAI = ee.ImageCollection("MODIS/MOD09GA_006_BAI"),
    MOD_A_BAI = ee.ImageCollection("MODIS/MYD09GA_006_BAI"),
    MOD_T_EVI = ee.ImageCollection("MODIS/MOD09GA_006_EVI"),
    MOD_T_NDVI = ee.ImageCollection("MODIS/MOD09GA_006_NDVI"),
    MOD_A_EVI = ee.ImageCollection("MODIS/MYD09GA_006_EVI"),
    MOD_A_NDVI = ee.ImageCollection("MODIS/MYD09GA_006_NDVI"),
    MOD_A_NDWI = ee.ImageCollection("MODIS/MYD09GA_006_NDWI"),
    MOD_T_NDWI = ee.ImageCollection("MODIS/MOD09GA_006_NDWI"),
    NOAA_NDVI = ee.ImageCollection("NOAA/CDR/AVHRR/NDVI/V5"),
    KBDI = ee.ImageCollection("UTOKYO/WTLAB/KBDI/v1"),
    S5_AI = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_AER_AI"),
    S5_CLOUD = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CLOUD"),
    PRISM = ee.ImageCollection("OREGONSTATE/PRISM/AN81d"),
    ERA5 = ee.ImageCollection("ECMWF/ERA5/DAILY"),
    GCOM_SST = ee.ImageCollection("JAXA/GCOM-C/L3/OCEAN/SST/V3"),
    GCOM_LST = ee.ImageCollection("JAXA/GCOM-C/L3/LAND/LST/V3"),
    CAMS_NRT = ee.ImageCollection("ECMWF/CAMS/NRT"),
    RTMA = ee.ImageCollection("NOAA/NWS/RTMA"),
    WAPOR_DEKADAL = ee.ImageCollection("FAO/WAPOR/2/L1_E_D"),
    S5_HCHO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_HCHO"),
    S5_O3 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_O3"),
    MOD11A1 = ee.ImageCollection("MODIS/061/MOD11A1"),
    MYD11A1 = ee.ImageCollection("MODIS/061/MYD11A1"),
    MCD15A3H = ee.ImageCollection("MODIS/061/MCD15A3H"),
    MOD13Q1 = ee.ImageCollection("MODIS/061/MOD13Q1"),
    MYD13Q1 = ee.ImageCollection("MODIS/061/MYD13Q1"),
    MYD15A2H = ee.ImageCollection("MODIS/061/MYD15A2H"),
    MODIS_T_VEG = ee.ImageCollection("MODIS/061/MOD13Q1"),
    MODIS_A_VEG = ee.ImageCollection("MODIS/061/MYD13Q1"),
    NASA_SMAP = ee.ImageCollection("NASA/SMAP/SPL4SMGP/007"),
    GOES_18_FDCF = ee.ImageCollection("NOAA/GOES/18/FDCF"),
    Sentinel_2_VI = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    MOD16A2 = ee.ImageCollection("MODIS/061/MOD16A2"),
    MOD14A1 = ee.ImageCollection("MODIS/061/MOD14A1"),
    MYD14A1 = ee.ImageCollection("MODIS/061/MYD14A1"),
    MYD17A2H = ee.ImageCollection("MODIS/061/MYD17A2H"),
    MOD17A2H = ee.ImageCollection("MODIS/061/MOD17A2H"),
    MOD_T_NDSI = ee.ImageCollection("MODIS/061/MOD10A1"),
    MOD_A_NDSI = ee.ImageCollection("MODIS/061/MYD10A1"),
    MOD_T_SNOW = ee.ImageCollection("MODIS/061/MOD10A1"),
    MOD_A_SNOW = ee.ImageCollection("MODIS/061/MYD10A1"),
    VNP13A1 = ee.ImageCollection("NASA/VIIRS/002/VNP13A1"),
    VIIRS_VI = ee.ImageCollection("NASA/VIIRS/002/VNP09GA");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Decisions
// Remove _006 from all MOD products
// WAPOR_Actual - 2023-Mar (Last)
// WAPOR_Daily - 2023-Mar (Last)
// WAPOR_DEKADAL - 2023-Mar (Last)
// BAI (MOD\MYD) - 2023-Feb (Last)
// ERA5 - 2020-Jul (Last)
// VNP - 2024-May (Last)
// MOD_T MOD_A (EVI, NDVI, NDWI) - 2023-Feb (Last)
// MOD VCI - messed by missing months - USE VIIRS VCI?
// VIIRS_VI (GEE) - 2024-Jun (Last)
// eVIIRS data need updating from ea2272_COG. Affects some data on VIIRS_VCI and eVIIRS_NDVI @moha
// Data outside Africa needed?: RTMA (up-to-date), Gridmet (up-to-date), Prism (up-to-date), KBDI (up-to-date), GOES-16 (up-to-date), GOES-17 (deprecated), GOES-18 (up-to-date) 
//



//all themes//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var dataset_themes = ['SELECT THEME','Air Quality','Evapo-Transpiration','Fire','Precipitation', 'Soil Moisture','Temperature', 'Vegetation', 'Weather', 'LULC'];
var garbage_collector_miniLayers = [];

//dataset per theme///////////////////////////////////////////////////////////////////////////////////////////////////////////

var image_collection, unaltered_image_collection, lyr_image, selected_data;

var dataset = [
                  [ S5_CO,
                    S5_CH4,
                    S5_SO2,
                    S5_NO2,
                    S5_CO_OFF,
                    S5_SO2_OFF,
                    S5_NO2_OFF,
                    S5_AI,
                    S5_CLOUD,
                    S5_HCHO,
                    S5_O3,
                    CAMS_NRT,
                  ],
  
                  [ MOD16A2,
                    WAPOR_Actual,
                    WAPOR_Daily,
                    WAPOR_DEKADAL,
                  ],

                  [ GOES_16_FDCF,
                    GOES_17_FDCF,
                    GOES_18_FDCF,
                    MOD14A1,
                    MYD14A1,
                    FIRMS,
                    MOD_T_BAI,
                    MOD_A_BAI,
                  ],

                  [ CHIRPS_Daily,
                    GSMaP,
                    //PERSIANN_CDR,
                    GRIDMET_D,
                    MOD_A_NDSI,
                    MOD_T_NDSI,
                    PRISM,
                    ERA5,
                    MOD_A_SNOW,
                    MOD_T_SNOW,
                  ],

                  [ NASA_SMAP
                  ],

                  [ MOD11A1,
                    MYD11A1,
                    PRISM,
                    ERA5,
                    GCOM_LST,
                    GCOM_SST,
                  ],

                  [ MCD15A3H,
                    MOD13Q1,
                    MYD13Q1,
                    MYD15A2H,
                    Sentinel_2_VI,
                    VNP13A1,
                    //LGPP,
                    //MGPP,
                    MYD17A2H,
                    MOD17A2H,
                    MOD_A_EVI,
                    MOD_A_NDVI,
                    MOD_A_NDWI,
                    MOD_T_EVI,
                    MOD_T_NDVI,
                    MOD_T_NDWI,
                    NOAA_NDVI,
                    KBDI,
                    "MODIS_VCI",
                    VIIRS_VI,
                    "VIIRS_VCI",
                    "eVIIRS_NDVI",
                    MODIS_T_VEG,
                    MODIS_A_VEG
                  ],
                  
                  [RTMA,
                  ],
                  
                  ["LULC",
                  ]
  
              ];
              

var dataset_names = [
  
                  [ 'SELECT DATASET',
                    'S5_CO',
                    'S5_CH4',
                    'S5_SO2',
                    'S5_NO2',
                    'S5_CO_OFF',
                    'S5_SO2_OFF',
                    'S5_NO2_OFF',
                    'S5_AI',
                    'S5_CLOUD',
                    'S5_HCHO',
                    'S5_O3',
                    'CAMS_NRT'
                  ],
  
                  [ 'SELECT DATASET',
                    'MOD16A2',
                    'WAPOR_Actual',
                    'WAPOR_Daily',
                    'WAPOR_DEKADAL'
                  ],

                  [ 'SELECT DATASET',
                    'GOES_16_FDCF',
                    'GOES_17_FDCF',
                    'GOES_18_FDCF',
                    'MOD14A1',
                    'MYD14A1',
                    'FIRMS',
                    'MOD_A_BAI',
                    'MOD_T_BAI'
                  ],

                  [ 'SELECT DATASET',
                    'CHIRPS_Daily',
                    'GSMaP',
                    //'PERSIANN_CDR',
                    'GRIDMET_D',
                    'MOD_A_NDSI',
                    'MOD_T_NDSI',
                    'PRISM',
                    'ERA5',
                    'MOD_A_SNOW',
                    'MOD_T_SNOW'
                  ],

                  [ 'SELECT DATASET',
                    'NASA_SMAP'
                  ],

                  [ 'SELECT DATASET',
                    'MOD11A1',
                    'MYD11A1',
                    'PRISM',
                    'ERA5',
                    'GCOM_LST',
                    'GCOM_SST',
                  ],

                  [ 'SELECT DATASET',
                    'MCD15A3H',
                    'MOD13Q1',
                    'MYD13Q1',
                    'MYD15A2H',
                    'Sentinel_2_VI',
                    'VNP13A1',
                    //'LGPP',
                    //'MGPP',
                    'MYD17A2H',
                    'MOD17A2H',
                    'MOD_A_EVI',
                    'MOD_A_NDVI',
                    'MOD_A_NDWI',
                    'MOD_T_EVI',
                    'MOD_T_NDVI',
                    'MOD_T_NDWI',
                    'NOAA_NDVI',
                    'KBDI',
                    'MODIS_VCI',
                    'VIIRS_VI',
                    "VIIRS_VCI",
                    "eVIIRS_NDVI",
                    "MODIS_T_VEG",
                    "MODIS_A_VEG"
                  ],
                  
                  [ 'SELECT DATASET',
                    'RTMA',
                  ],
                  
                  [ 'SELECT DATASET',
                    'LULC',
                  ]
  
              ];
              

var dataset_map =  {
                      "MOD16A2":MOD16A2,
                      "WAPOR_Actual" : WAPOR_Actual,
                      "WAPOR_Daily" : WAPOR_Daily,
                      "GOES_16_FDCF" : GOES_16_FDCF,
                      "GOES_17_FDCF" : GOES_17_FDCF,
                      "GOES_18_FDCF" : GOES_18_FDCF,
                      "MOD14A1" : MOD14A1,
                      "MYD14A1" : MYD14A1,
                      "CHIRPS_Daily" : CHIRPS_Daily,
                      "GSMaP" : GSMaP,
                      //"PERSIANN_CDR" : PERSIANN_CDR,
                      "NASA_SMAP" : NASA_SMAP,
                      "MOD11A1" : MOD11A1,
                      "MYD11A1" : MYD11A1,
                      "MCD15A3H" : MCD15A3H,
                      "MOD13Q1" : MOD13Q1,
                      "MYD13Q1" : MYD13Q1,
                      "MYD15A2H" : MYD15A2H,
                      "Sentinel_2_VI" : Sentinel_2_VI,
                      "VNP13A1": VNP13A1,
                      //"LGPP" : LGPP,
                      //"MGPP" : MGPP,
                      "MYD17A2H" : MYD17A2H,
                      "MOD17A2H" : MOD17A2H,
                      "S5_CO" : S5_CO,
                      "S5_CH4" : S5_CH4,
                      "S5_SO2" : S5_SO2,
                      "S5_NO2" : S5_NO2,
                      "S5_CO_OFF" : S5_CO_OFF,
                      "S5_SO2_OFF" : S5_SO2_OFF,
                      "S5_NO2_OFF" : S5_NO2_OFF,
                      "GRIDMET_D" : GRIDMET_D,
                      "S5_AI" : S5_AI,
                      "S5_CLOUD" : S5_CLOUD,
                      "S5_HCHO" : S5_HCHO,
                      "S5_O3" : S5_O3,
                      "CAMS_NRT": CAMS_NRT,
                      "WAPOR_DEKADAL" : WAPOR_DEKADAL,
                      "FIRMS" : FIRMS,
                      "MOD_A_BAI" : MOD_A_BAI,
                      "MOD_T_BAI" : MOD_T_BAI,
                      "MOD_A_NDSI" : MOD_A_NDSI,
                      "MOD_T_NDSI" : MOD_T_NDSI,
                      "PRISM" : PRISM,
                      "ERA5" : ERA5,
                      "MOD_A_SNOW" : MOD_A_SNOW,
                      "MOD_T_SNOW" : MOD_T_SNOW,
                      "GCOM_LST" : GCOM_LST,
                      "GCOM_SST" : GCOM_SST,
                      "MOD_A_EVI" : MOD_A_EVI,
                      "MOD_A_NDVI" : MOD_A_NDVI,
                      "MOD_A_NDWI" : MOD_A_NDWI,
                      "MOD_T_EVI" : MOD_T_EVI,
                      "MOD_T_NDVI" : MOD_T_NDVI,
                      "MOD_T_NDWI" : MOD_T_NDWI,
                      "NOAA_NDVI" : NOAA_NDVI,
                      "KBDI" : KBDI,
                      "RTMA" : RTMA,
                      "MODIS_VCI": "MODIS_VCI",
                      "VIIRS_VI":VIIRS_VI,
                      "VIIRS_VCI": "VIIRS_VCI",
                      "eVIIRS_NDVI":"eVIIRS_NDVI",
                      "MODIS_T_VEG": MODIS_T_VEG,
                      "MODIS_A_VEG": MODIS_A_VEG,
                      "LULC": "LULC"
                    };
                    
var dataset_scale =  {
                      "MOD16A2":500,
                      "WAPOR_Actual" : 248.2,
                      "WAPOR_Daily" : 18924,
                      "GOES_16_FDCF" : 2000,
                      "GOES_17_FDCF" : 2000,
                      "GOES_18_FDCF" : 2000,
                      "MOD14A1" : 1000,
                      "MYD14A1" : 1000,
                      "CHIRPS_Daily" : 5566,
                      "GSMaP" : 11132,
                      //"PERSIANN_CDR" : 27830,
                      "NASA_SMAP" : 10000,
                      "MOD11A1" : 1000,
                      "MYD11A1" : 1000,
                      "MCD15A3H" : 500,
                      "MOD13Q1" : 250,
                      "MYD13Q1" : 250,
                      "MYD15A2H" : 500,
                      "Sentinel_2_VI" : 10,
                      "VNP13A1": 500,
                      //"LGPP" : 250,
                      //"MGPP" : 250,
                      "MYD17A2H" : 500,
                      "MOD17A2H" : 500,
                      "S5_CO" : 1113.2,
                      "S5_CH4" : 1113.2,
                      "S5_SO2" : 1113.2,
                      "S5_NO2" : 1113.2,
                      "S5_CO_OFF" : 1113.2,
                      "S5_SO2_OFF" : 1113.2,
                      "S5_NO2_OFF" : 1113.2,
                      "GRIDMET_D" : 4638.3,
                      "S5_AI" : 1113.2,
                      "S5_CLOUD" : 1113.2,
                      "S5_HCHO" : 1113.2,
                      "S5_O3" : 1113.2,
                      "CAMS_NRT": 44528,
                      "WAPOR_DEKADAL" : 248.2,
                      "FIRMS" : 1000,
                      "MOD_A_BAI" : 463.313,
                      "MOD_T_BAI" : 463.313,
                      "MOD_A_NDSI" : 463.313,
                      "MOD_T_NDSI" : 463.313,
                      "PRISM" : 4638.3,
                      "ERA5" : 27830,
                      "MOD_A_SNOW" : 500,
                      "MOD_T_SNOW" : 500,
                      "GCOM_LST" : 4638.3,
                      "GCOM_SST" : 4638.3,
                      "MOD_A_EVI" : 463.313,
                      "MOD_A_NDVI" : 463.313,
                      "MOD_A_NDWI" : 463.313,
                      "MOD_T_EVI" : 463.313,
                      "MOD_T_NDVI" : 463.313,
                      "MOD_T_NDWI" : 463.313,
                      "NOAA_NDVI" : 5566,
                      "KBDI" : 4000,
                      "RTMA" : 2500,
                      "MODIS_VCI" : 463.313,
                      "VIIRS_VI": 1000,
                      "VIIRS_VCI": 1000,
                      "eVIIRS_NDVI": 375,
                      "MODIS_T_VEG": 250,
                      "MODIS_A_VEG": 250,
                      "LULC": 0.5
                    };
                    
var dataset_multiplier =  { 
                            "MOD16A2":0.1,
                            "WAPOR_Actual" : 0.1,
                            "WAPOR_Daily" : 0.1,
                            "GOES_16_FDCF" : 1,
                            "GOES_17_FDCF" : 1,
                            "GOES_18_FDCF" : 1,
                            "MOD14A1" : 0.1,
                            "MYD14A1" : 0.1,
                            "CHIRPS_Daily" : 1,
                            "GSMaP" : 1,
                            //"PERSIANN_CDR" : 1,
                            "NASA_SMAP" : 1,
                            "MOD11A1" : 0.02,
                            "MYD11A1" : 0.02,
                            "MCD15A3H" : [0.01, 0.1],
                            "MOD13Q1" : 0.0001,
                            "MYD13Q1" : 0.0001,
                            "MYD15A2H" : [0.01, 0.1],
                            "Sentinel_2_VI" : 1,
                            "VNP13A1": 0.0001,
                            //"LGPP" : 0.0001,
                            //"MGPP" : 0.0001,
                            "MYD17A2H" : 0.0001,
                            "MOD17A2H" : 0.0001,
                            "S5_CO" : 1,
                            "S5_CH4" : 1,
                            "S5_SO2" : 1,
                            "S5_NO2" : 1,
                            "S5_CO_OFF" : 1,
                            "S5_SO2_OFF" : 1,
                            "S5_NO2_OFF" : 1,
                            "GRIDMET_D" : 1,
                            "S5_AI" : 1,
                            "S5_CLOUD" : 1,
                            "S5_HCHO" : 1,
                            "S5_O3" : 1,
                            "CAMS_NRT": 1,
                            "WAPOR_DEKADAL" : 0.1,
                            "FIRMS" : 1,
                            "MOD_A_BAI" : 1,
                            "MOD_T_BAI" : 1,
                            "MOD_A_NDSI" : 1,
                            "MOD_T_NDSI" : 1,
                            "PRISM" : 1,
                            "ERA5" : 1,
                            "MOD_A_SNOW" : 1,
                            "MOD_T_SNOW" : 1,
                            "GCOM_LST" : 1,
                            "GCOM_SST" : 1,
                            "MOD_A_EVI" : 1,
                            "MOD_A_NDVI" : 1,
                            "MOD_A_NDWI" : 1,
                            "MOD_T_EVI" : 1,
                            "MOD_T_NDVI" : 1,
                            "MOD_T_NDWI" : 1,
                            "NOAA_NDVI" : 0.0001,
                            "KBDI" : 1,
                            "RTMA" : 1,
                            "MODIS_VCI" : 1,
                            "VIIRS_VI":0.0001,
                            "VIIRS_VCI": 1,
                            "eVIIRS_NDVI" : 1,
                            "MODIS_T_VEG": 0.0001,
                            "MODIS_A_VEG": 0.0001,
                            "LULC": 1
                            
                          };

var dataset_title =  {
                      "MOD16A2": "MOD16A2.061: Terra Net Evapotranspiration 8-Day Global 500m",
                      "WAPOR_Actual" : "WAPOR Actual Evapotranspiration and Interception",
                      "WAPOR_Daily" : "WAPOR Daily Reference Evapotranspiration",
                      "GOES_16_FDCF" : "GOES-16 FDCF Series ABI Level 2 Fire/Hot Spot Characterization Full Disk",
                      "GOES_17_FDCF" : "GOES-17 FDCF Series ABI Level 2 Fire/Hot Spot Characterization Full Disk",
                      "GOES_18_FDCF" : "GOES-18 FDCF Series ABI Level 2 Fire/Hot Spot Characterization Full Disk",
                      "MOD14A1" : "MOD14A1.061: Terra Thermal Anomalies & Fire Daily Global 1km",
                      "MYD14A1" : "MYD14A1.061: Aqua Thermal Anomalies & Fire Daily Global 1km",
                      "CHIRPS_Daily" : "CHIRPS Daily: Climate Hazards Group InfraRed Precipitation With Station Data (Version 2.0 Final)",
                      "GSMaP" : "GSMaP Operational: Global Satellite Mapping of Precipitation",
                      //"PERSIANN_CDR" : "PERSIANN-CDR: Precipitation Estimation From Remotely Sensed Information Using Artificial Neural Networks-Climate Data Record",
                      "NASA_SMAP" : "SMAP L4 Global 3-hourly 9-km Surface and Root Zone Soil Moisture",
                      "MOD11A1" : "MOD11A1.061 Terra Land Surface Temperature and Emissivity Daily Global 1km",
                      "MYD11A1" : "MYD11A1.061 Aqua Land Surface Temperature and Emissivity Daily Global 1km",
                      "MCD15A3H" : "MCD15A3H.061 MODIS Leaf Area Index/FPAR 4-Day Global 500m" ,
                      "MOD13Q1" : "MOD13Q1.061 Terra Vegetation Indices 16-Day Global 250m",
                      "MYD13Q1" : "MYD13Q1.061 Aqua Vegetation Indices 16-Day Global 250m" ,
                      "MYD15A2H" : "MYD15A2H.061: Aqua Leaf Area Index/FPAR 8-Day Global 500m",
                      "Sentinel_2_VI" : "Sentinel-2 MSI: MultiSpectral Instrument, Level-2A - Computed NDVI",
                      "VNP13A1" : "VNP13A1: VIIRS Vegetation Indices 16-Day 500m",
                      //"LGPP" : "Landsat Gross Primary Production CONUS",
                      //"MGPP" : "MODIS Gross Primary Production CONUS",
                      "MYD17A2H" : "MYD17A2H.061: Aqua Gross Primary Productivity 8-Day Global 500m",
                      "MOD17A2H" : "MOD17A2H.061: Terra Gross Primary Productivity 8-Day Global 500m",
                      "S5_CO" : "Sentinel-5P NRTI CO: Near Real-Time Carbon Monoxide",
                      "S5_CH4" : "Sentinel-5P OFFL CH4: Offline Methane",
                      "S5_SO2" : "Sentinel-5P NRTI SO2: Near Real-Time Sulphur Dioxide",
                      "S5_NO2" : "Sentinel-5P NRTI NO2: Near Real-Time Nitrogen Dioxide",
                      "S5_CO_OFF" : "Sentinel-5P OFFL CO: Offline Carbon Monoxide",
                      "S5_SO2_OFF" : "Sentinel-5P OFFL SO2: Offline Sulphur Dioxide",
                      "S5_NO2_OFF" : "Sentinel-5P OFFL NO2: Offline Nitrogen Dioxide",
                      "GRIDMET_D" : "GRIDMET DROUGHT: CONUS Drought Indices",
                      "S5_AI" : "Sentinel-5P NRTI AER AI: Near Real-Time UV Aerosol Index",
                      "S5_CLOUD" : "Sentinel-5P NRTI CLOUD: Near Real-Time Cloud",
                      "S5_HCHO" : "Sentinel-5P NRTI HCHO: Near Real-Time Formaldehyde",
                      "S5_O3" : "Sentinel-5P NRTI O3: Near Real-Time Ozone",
                      "CAMS_NRT": "Copernicus Atmosphere Monitoring Service (CAMS) Global Near-Real-Time",
                      "WAPOR_DEKADAL" : "WAPOR Dekadal Evaporation",
                      "FIRMS" : "FIRMS - Fire Information for Resource Management System",
                      "MOD_A_BAI" : "MODIS Aqua Daily BAI",
                      "MOD_T_BAI" : "MODIS Terra Daily BAI",
                      "MOD_A_NDSI" : "MODIS Aqua Daily NDSI ",
                      "MOD_T_NDSI" : "MODIS Terra Daily NDSI ",
                      "PRISM" : "PRISM Daily Spatial Climate Dataset AN81d",
                      "ERA5" : "ERA5 Daily Aggregates - Latest Climate Reanalysis Produced by ECMWF / Copernicus Climate Change Service",
                      "MOD_A_SNOW" : "MYD10A1.061 Aqua Snow Cover Daily Global 500m",
                      "MOD_T_SNOW" : "MOD10A1.061 Terra Snow Cover Daily Global 500m",
                      "GCOM_LST" : "GCOM-C/SGLI L3 Land Surface Temperature (V3)",
                      "GCOM_SST" : "GCOM-C/SGLI L3 Sea Surface Temperature (V3)",
                      "MOD_A_EVI" : "MODIS Aqua Daily EVI ",
                      "MOD_A_NDVI" : "MODIS Aqua Daily NDVI ",
                      "MOD_A_NDWI" : "MODIS Aqua Daily NDWI ",
                      "MOD_T_EVI" : "MODIS Terra Daily EVI ",
                      "MOD_T_NDVI" : "MODIS Terra Daily NDVI ",
                      "MOD_T_NDWI" : "MODIS Terra Daily NDWI ",
                      "NOAA_NDVI" : "NOAA CDR AVHRR NDVI: Normalized Difference Vegetation Index, Version 5",
                      "KBDI" : "KBDI: Keetch-Byram Drought Index",
                      "RTMA" : "RTMA: Real-Time Mesoscale Analysis",
                      "MODIS_VCI" : "MODIS Vegetation Condition Index (VCI) - Drought Monitoring",
                      "VIIRS_VI" : "VNP09GA: VIIRS Surface Reflectance Daily 1km - Computed NDVI",
                      "VIIRS_VCI": "VIIRS Vegetation Condition Index (VCI) - Drought Monitoring",
                      "eVIIRS_NDVI" : "eVIIRS Normalized Difference Vegetation Index (NDVI)",
                      "MODIS_T_VEG": "MOD13Q1.061 Terra Vegetation Indices 16-Day Global 250m",
                      "MODIS_A_VEG": "MYD13Q1.061 Aqua Vegetation Indices 16-Day Global 250m",
                      "LULC": "Land Use Land Cover"
                    };


var dataset_url =  {
                      "MOD16A2":"https://lpdaac.usgs.gov/products/mod16a2v006/",
                      "WAPOR_Actual" : "https://wapor.apps.fao.org/catalog/WAPOR_2/1/L1_AETI_D",
                      "WAPOR_Daily" : "https://wapor.apps.fao.org/catalog/WAPOR_2/1/L1_RET_E",
                      "GOES_16_FDCF" : "https://data.noaa.gov/dataset/dataset/noaa-goes-r-series-advanced-baseline-imager-abi-level-2-fire-hot-spot-characterization-fdc",
                      "GOES_17_FDCF" : "https://data.noaa.gov/dataset/dataset/noaa-goes-r-series-advanced-baseline-imager-abi-level-2-fire-hot-spot-characterization-fdc",
                      "GOES_18_FDCF" : "https://data.noaa.gov/dataset/dataset/noaa-goes-r-series-advanced-baseline-imager-abi-level-2-fire-hot-spot-characterization-fdc",
                      "MOD14A1" : "https://lpdaac.usgs.gov/products/mod14a1v006/",
                      "MYD14A1" : "https://lpdaac.usgs.gov/products/mod14a1v006/",
                      "CHIRPS_Daily" : "https://chc.ucsb.edu/data/chirps",
                      "GSMaP" : "https://sharaku.eorc.jaxa.jp/GSMaP/",
                      //"PERSIANN_CDR" : "https://developers.google.com/earth-engine/datasets/catalog/NOAA_PERSIANN-CDR",
                      "NASA_SMAP" : "https://nsidc.org/data/spl4smgp/versions/7",
                      "MOD11A1" : "https://lpdaac.usgs.gov/products/mod11a1v061/",
                      "MYD11A1" : "https://lpdaac.usgs.gov/products/myd11a1v061/",
                      "MCD15A3H" : "https://lpdaac.usgs.gov/products/mcd15a3hv061/",
                      "MOD13Q1" : "https://lpdaac.usgs.gov/products/mod13q1v061/",
                      "MYD13Q1" : "https://lpdaac.usgs.gov/products/myd13q1v061/",
                      "MYD15A2H" : "https://lpdaac.usgs.gov/products/myd15a2hv061/",
                      "Sentinel_2_VI" : "https://earth.esa.int/web/sentinel/user-guides/sentinel-2-msi/product-types/level-2a",
                      "VNP13A1": "https://lpdaac.usgs.gov/products/vnp13a1v001/",
                      //"LGPP" : "https://developers.google.com/earth-engine/datasets/catalog/UMT_NTSG_v2_LANDSAT_GPP",
                      //"MGPP" : "https://developers.google.com/earth-engine/datasets/catalog/UMT_NTSG_v2_MODIS_GPP",
                      "MYD17A2H" : "https://lpdaac.usgs.gov/products/myd17a2hv006/",
                      "MOD17A2H" : "https://lpdaac.usgs.gov/products/mod17a2hv006/",
                      "S5_CO" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_CH4" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_SO2" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_NO2" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_CO_OFF" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_SO2_OFF" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_NO2_OFF" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "GRIDMET_D" : "https://www.climatologylab.org/gridmet.html",
                      "S5_AI" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_CLOUD" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_HCHO" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "S5_O3" : "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-5p-tropomi",
                      "CAMS_NRT": "https://apps.ecmwf.int/datasets/data/cams-nrealtime/levtype=sfc/",
                      "WAPOR_DEKADAL" : "https://wapor.apps.fao.org/catalog/WAPOR_2/1/L1_E_D",
                      "FIRMS" : "https://www.earthdata.nasa.gov/learn/find-data/near-real-time/firms",
                      "MOD_A_BAI" : "https://www.tandfonline.com/doi/abs/10.1080/01431160210153129?cookieSet=1",
                      "MOD_T_BAI" : "https://www.tandfonline.com/doi/abs/10.1080/01431160210153129?cookieSet=1",
                      "MOD_A_NDSI" : "https://ieeexplore.ieee.org/document/399618",
                      "MOD_T_NDSI" : "https://ieeexplore.ieee.org/document/399618",
                      "PRISM" : "https://www.prism.oregonstate.edu/documents/PRISM_datasets.pdf",
                      "ERA5" : "https://cds.climate.copernicus.eu/#!/home",
                      "MOD_A_SNOW" : "https://nsidc.org/data/MYD10A1/versions/6",
                      "MOD_T_SNOW" : "https://nsidc.org/data/MOD10A1/versions/6",
                      "GCOM_LST" : "https://suzaku.eorc.jaxa.jp/GCOM/index.html",
                      "GCOM_SST" : "https://suzaku.eorc.jaxa.jp/GCOM/index.html",
                      "MOD_A_EVI" : "https://www.sciencedirect.com/science/article/abs/pii/S0034425702000962",
                      "MOD_A_NDVI" : "https://www.sciencedirect.com/science/article/abs/pii/S0034425702000962",
                      "MOD_A_NDWI" : "https://www.sciencedirect.com/science/article/abs/pii/S0034425796000673",
                      "MOD_T_EVI" : "https://www.sciencedirect.com/science/article/abs/pii/S0034425702000962",
                      "MOD_T_NDVI" : "https://www.sciencedirect.com/science/article/abs/pii/S0034425702000962",
                      "MOD_T_NDWI" : "https://www.sciencedirect.com/science/article/abs/pii/S0034425796000673",
                      "NOAA_NDVI" : "https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C01558/html",
                      "KBDI" : "http://wtlab.iis.u-tokyo.ac.jp/DMEWS/",
                      "RTMA" : "https://www.nco.ncep.noaa.gov/pmb/products/rtma/",
                      "MODIS_VCI" : "https://www.droughtmanagement.info/vegetation-condition-index-vci/",
                      "VIIRS_VI": "https://lpdaac.usgs.gov/products/vnp09gav001/",
                      "VIIRS_VCI": "https://www.droughtmanagement.info/vegetation-condition-index-vci/",
                      "eVIIRS_NDVI" : "https://earlywarning.usgs.gov/fews/product/900#documentation",
                      "MODIS_T_VEG": "https://doi.org/10.5067/MODIS/MOD13Q1.061",
                      "MODIS_A_VEG": "https://doi.org/10.5067/MODIS/MYD13Q1.061",
                      "LULC" : ""
                    };

var dataset_temporal =  {
                          "MOD16A2": "8 days",
                          "WAPOR_Actual" : "10 days",
                          "WAPOR_Daily" : "Daily",
                          "GOES_16_FDCF" : "5 - 15 minutes",
                          "GOES_17_FDCF" : "5 - 15 minutes",
                          "GOES_18_FDCF" : "5 - 15 minutes",
                          "MOD14A1" : "Daily",
                          "MYD14A1" : "Daily",
                          "CHIRPS_Daily" : "Daily",
                          "GSMaP" : "Hourly",
                          //"PERSIANN_CDR" : "Daily",
                          "NASA_SMAP" : "2 - 3 days",
                          "MOD11A1" : "Daily",
                          "MYD11A1" : "Daily",
                          "MCD15A3H" : "4 days",
                          "MOD13Q1" : "16 days",
                          "MYD13Q1" : "16 days",
                          "MYD15A2H" : "8 days",
                          "Sentinel_2_VI" : "5 days",
                          "VNP13A1": "16 days",
                          //"LGPP" : "16 days",
                          //"MGPP" : "8 days",
                          "MYD17A2H" : "8 days",
                          "MOD17A2H" : "8 days",
                          "S5_CO" : "Daily",
                          "S5_CH4" : "Daily",
                          "S5_SO2" : "Daily",
                          "S5_NO2" : "Daily",
                          "S5_CO_OFF" : "Daily",
                          "S5_SO2_OFF" : "Daily",
                          "S5_NO2_OFF" : "Daily",
                          "GRIDMET_D" : "Daily",
                          "S5_AI" : "Daily",
                          "S5_CLOUD" : "Daily",
                          "S5_HCHO" : "Daily",
                          "S5_O3" : "Daily",
                          "CAMS_NRT": "Daily",
                          "WAPOR_DEKADAL" : "10 days",
                          "FIRMS" : "Daily",
                          "MOD_A_BAI" : "Daily",
                          "MOD_T_BAI" : "Daily",
                          "MOD_A_NDSI" : "Daily",
                          "MOD_T_NDSI" : "Daily",
                          "PRISM" : "Daily",
                          "ERA5" : "Daily",
                          "MOD_A_SNOW" : "Daily",
                          "MOD_T_SNOW" : "Daily",
                          "GCOM_LST" : "Daily",
                          "GCOM_SST" : "Daily",
                          "MOD_A_EVI" : "Daily",
                          "MOD_A_NDVI" : "Daily",
                          "MOD_A_NDWI" : "Daily",
                          "MOD_T_EVI" : "Daily",
                          "MOD_T_NDVI" : "Daily",
                          "MOD_T_NDWI" : "Daily",
                          "NOAA_NDVI" : "Daily",
                          "KBDI" : "Daily",
                          "RTMA" : "Daily",
                          "MODIS_VCI" : "Monthly",
                          "VIIRS_VI": "Daily",
                          "VIIRS_VCI" : "Monthly",
                          "eVIIRS_NDVI" : "5 days",
                          "MODIS_T_VEG" : "16 days",
                          "MODIS_A_VEG" : "16 days",
                          "LULC": "Monthly"
                        };
                        
var dataset_coverage = {
                          "MOD16A2": "Global",
                          "WAPOR_Actual": "Global",
                          "WAPOR_Daily": "Global",
                          "GOES_16_FDCF": "U.S.",
                          "GOES_17_FDCF": "U.S.",
                          "GOES_18_FDCF": "U.S.",
                          "MOD14A1": "Global",
                          "MYD14A1": "Global",
                          "CHIRPS_Daily": "Global",
                          "GSMaP": "Global",
                          //"PERSIANN_CDR": "Global",
                          "NASA_SMAP": "Global",
                          "MOD11A1": "Global",
                          "MYD11A1": "Global",
                          "MCD15A3H": "Global",
                          "MOD13Q1": "Global",
                          "MYD13Q1": "Global",
                          "MYD15A2H": "Global",
                          "Sentinel_2_VI": "Global",
                          "VNP13A1": "Global",
                          //"LGPP": "Global",
                          //"MGPP": "Global",
                          "MYD17A2H": "Global",
                          "MOD17A2H": "Global",
                          "S5_CO": "Global",
                          "S5_CH4": "Global",
                          "S5_SO2": "Global",
                          "S5_NO2": "Global",
                          "S5_CO_OFF": "Global",
                          "S5_SO2_OFF": "Global",
                          "S5_NO2_OFF": "Global",
                          "GRIDMET_D": "U.S.",
                          "S5_AI": "Global",
                          "S5_CLOUD": "Global",
                          "S5_HCHO": "Global",
                          "S5_O3": "Global",
                          "CAMS_NRT": "Global",
                          "WAPOR_DEKADAL": "Global",
                          "FIRMS": "Global",
                          "MOD_A_BAI": "Global",
                          "MOD_T_BAI": "Global",
                          "MOD_A_NDSI": "Global",
                          "MOD_T_NDSI": "Global",
                          "PRISM": "U.S.",
                          "ERA5": "Global",
                          "MOD_A_SNOW": "Global",
                          "MOD_T_SNOW": "Global",
                          "GCOM_LST": "Global",
                          "GCOM_SST": "Global",
                          "MOD_A_EVI": "Global",
                          "MOD_A_NDVI": "Global",
                          "MOD_A_NDWI": "Global",
                          "MOD_T_EVI": "Global",
                          "MOD_T_NDVI": "Global",
                          "MOD_T_NDWI": "Global",
                          "NOAA_NDVI": "Global",
                          "KBDI": "Asia, Australia",
                          "RTMA": "U.S.",
                          "MODIS_VCI": "Global",
                          "VIIRS_VI": "Global",
                          "VIIRS_VCI": "Global",
                          "eVIIRS_NDVI": "Global",
                          "MODIS_T_VEG": "Global",
                          "MODIS_A_VEG": "Global",
                          "LULC": "Global"
                        };
             
var selected_band;

var dataset_bands = [
  
  
                      [ ['SELECT BAND', 'CO_column_number_density'],
                        ['SELECT BAND', 'CH4_column_volume_mixing_ratio_dry_air'],
                        ['SELECT BAND', 'SO2_column_number_density'],
                        ['SELECT BAND', 'NO2_column_number_density'],
                        ['SELECT BAND', 'CO_column_number_density'],
                        ['SELECT BAND', 'SO2_column_number_density'],
                        ['SELECT BAND', 'NO2_column_number_density'],
                        ['SELECT BAND', 'absorbing_aerosol_index'],
                        ['SELECT BAND', 'cloud_fraction'],
                        ['SELECT BAND', 'tropospheric_HCHO_column_number_density'],
                        ['SELECT BAND', 'O3_column_number_density'],
                        ['SELECT BAND', 'total_column_nitrogen_dioxide_surface',
                                        'total_column_sulphur_dioxide_surface',
                                        'total_column_carbon_monoxide_surface',
                                        'total_column_formaldehyde_surface',
                                        'gems_total_column_ozone_surface',
                                        'total_column__peroxyacetyl_nitrate_surface',
                                        'total_column__isoprene_surface',
                                        'total_column_nitrogen_monoxide_surface',
                                        'total_column_hydrogen_peroxide_surface',
                                        'total_column_hydroxyl_radical_surface',
                                        'total_column_methane_surface',
                                        'total_column__ethane_surface',
                                        'total_column_propane_surface',
                                        'total_column_nitric_acid_surface'
                        ]
                      ],
  
                      [ ['SELECT BAND','ET', 'PET'],
                        ['SELECT BAND','L1_AETI_D'], 
                        ['SELECT BAND','L1_RET_E'],
                        ['SELECT BAND','L1_E_D']
                      ],
                      
                      [ ['SELECT BAND','Power'],
                        ['SELECT BAND','Power'],
                        ['SELECT BAND','Power'],
                        ['SELECT BAND','MaxFRP'],
                        ['SELECT BAND','MaxFRP'],
                        ['SELECT BAND','T21'],
                        ['SELECT BAND','BAI'],
                        ['SELECT BAND','BAI'],
                      ],
                      
                      [ ['SELECT BAND','precipitation'],
                        ['SELECT BAND','hourlyPrecipRate'],
                        //['SELECT BAND','precipitation'],
                        ['SELECT BAND', 'pdsi'],
                        ['SELECT BAND', 'NDSI'],
                        ['SELECT BAND', 'NDSI'],
                        ['SELECT BAND', 'ppt'],
                        ['SELECT BAND', 'total_precipitation'],
                        ['SELECT BAND', 'NDSI_Snow_Cover'],
                        ['SELECT BAND', 'NDSI_Snow_Cover'],
                      ],
                      
                      [ ['SELECT BAND','sm_surface', 'sm_rootzone', 'sm_profile']
                      ],
                      
                      [ ['SELECT BAND','LST_Day_1km'],
                        ['SELECT BAND','LST_Day_1km'],
                        ['SELECT BAND','tmean'],
                        ['SELECT BAND','mean_2m_air_temperature'],
                        ['SELECT BAND','LST_AVE'],
                        ['SELECT BAND','SST_AVE'],
                      
                      ],
                      
                      [ ['SELECT BAND', 'Fpar', 'Lai'],
                        ['SELECT BAND', 'NDVI','EVI'],
                        ['SELECT BAND', 'NDVI', 'EVI'],
                        ['SELECT BAND', 'Fpar_500m', 'Lai_500m'],
                        ['SELECT BAND', 'NDVI', 'EVI'],
                        ['SELECT BAND', 'NDVI', 'EVI', 'EVI2'],
                        //['SELECT BAND', 'GPP'],
                        //['SELECT BAND', 'GPP'],
                        ['SELECT BAND', 'Gpp'],
                        ['SELECT BAND', 'Gpp'],
                        ['SELECT BAND', 'EVI'],
                        ['SELECT BAND', 'NDVI'],
                        ['SELECT BAND', 'NDWI'],
                        ['SELECT BAND', 'EVI'],
                        ['SELECT BAND', 'NDVI'],
                        ['SELECT BAND', 'NDWI'],
                        ['SELECT BAND', 'NDVI'],
                        ['SELECT BAND', 'KBDI'],
                        ['SELECT BAND', 'VCI'],
                        ['SELECT BAND', 'NDVI', 'EVI'],
                        ['SELECT BAND', 'VCI'],
                        ['SELECT BAND', 'NDVI'],
                        ['SELECT BAND', 'NDVI', 'EVI'],
                        ['SELECT BAND', 'NDVI', 'EVI']
                      ],
                      
                      [ ['SELECT BAND', 'PRES', 'TMP', 'SPFH', 'WDIR',  'WIND', 'TCDC']
                      ],
                      
                      [ ['SELECT BAND', 'LULC']
                      ]
                      
                    ];

//Mechanized Models/////////////////////////////////////////////////////////////////////////////////////////////////////////
var modis_vci_IC = require('users/firsake/ImportantModules:MODIS_VCI_Model.js');
var viirs_vci_IC = require('users/firsake/ImportantModules:VIIRS_VCI_Model.js');
var lulc_IC = require('users/firsake/ImportantModules:lulc_processor.js');

//Statistics////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var statistics = ['SELECT STATISTIC', 'Mean', 'Max', 'Min', 'Median', 'Standard Deviation', 'Variance', 'Sum', 'Combined', 'Histogram (LULC)'];

var combined_0 = ee.Reducer.mean()
                      .setOutputs(["mean"])
                      .combine({
                          reducer2:ee.Reducer.max().setOutputs(["max"]), sharedInputs: true
                      });
    

var combined_1 = combined_0.combine({
                                        reducer2:ee.Reducer.min().setOutputs(["min"]), sharedInputs: true
                                   });

var combined_2 = combined_1.combine({
                                        reducer2:ee.Reducer.median().setOutputs(["median"]), sharedInputs: true
                                    });

var combined_3 = combined_2.combine({
                                        reducer2:ee.Reducer.stdDev().setOutputs(["stdDev"]), sharedInputs: true
                                   });

var combined_4 = combined_3.combine({
                                        reducer2:ee.Reducer.variance().setOutputs(["variance"]), sharedInputs: true
                                   });

var combined_final = combined_3; /*.combine({
                                            reducer2:ee.Reducer.sum().setOutputs(["sum"]), sharedInputs: true
                                        });*/


var statistic_reducers = [
                           ee.Reducer.mean().setOutputs(['mean']),
                           ee.Reducer.max().setOutputs(['max']),
                           ee.Reducer.min().setOutputs(['min']),
                           ee.Reducer.median().setOutputs(['median']),
                           ee.Reducer.stdDev().setOutputs(['stdDev']),
                           ee.Reducer.variance().setOutputs(['variance']),
                           ee.Reducer.sum().setOutputs(['sum']),
                           combined_final,
                           ee.Reducer.frequencyHistogram().setOutputs(['class frequency'])
                         ];
        
//Visualization Parameters//////////////////////////////////////////////////////////////////////////////////////////////////

//

var palette_def_normal = ['Low','Medium','High'];
var palette_def_lulc = ['Urban-1', 'Urban-2', 'Grassland/Shrubland/Bareland', 'Cropland', 'Forest-sparse', 'Forest-dense', 'Water'];
//Air
var palette_air = ['209C05', 'EBFF0A', 'ff0A0A'];

var vizParams_air = {
  palette: palette_air
};


//vegetation
var palette_veg = ['DA2A2A', 'FFF9AB', '3AD03A'];

var vizParams_veg = {
  palette: palette_veg
};

//Evapo-Transpiration
var palette_et = ['FFF9AB', 'B5DA9E', '336C77'];

var vizParams_et = {
  palette: palette_et
};

//'Fire'
var palette_fire = ['000000', '490E0E', '911C1C'];

var vizParams_fire = {
  palette: palette_fire
};

//Precipitation
var palette_ppt = ['D6E8EE', '6B829B', '001B48'];

var vizParams_ppt = {
  palette: palette_ppt
};

//Soil Moisture
var palette_sm = ['FFCA91', '868572', '0C4052'];

var vizParams_sm = {
  palette: palette_sm
};

//Temperature
var palette_temp = ['375FC5','7D4174','C22323'];

var vizParams_temp = {
  palette: palette_temp
};

//Weather
var palette_wt =  ['001137', 'E7EB05', '620500'];

var vizParams_wt = {
  palette: palette_wt
};

//LULC
var palette_lulc =  ['ff0000', '8d5524', 'ffdbac', 'ffff00', '00c800', '006400', '0000ff'];

var vizParams_lulc = {
  palette: palette_lulc
};

var palettes = [palette_air, palette_et, palette_fire, palette_ppt, palette_sm, palette_temp, palette_veg, palette_wt, palette_lulc];
var vizParams = [vizParams_air, vizParams_et, vizParams_fire, vizParams_ppt, vizParams_sm, vizParams_temp, vizParams_veg, vizParams_wt, vizParams_lulc];
var palette_defs = [palette_def_normal, palette_def_normal, palette_def_normal, palette_def_normal, palette_def_normal, palette_def_normal, palette_def_normal, palette_def_normal, palette_def_lulc];
//Geometries///////////////////////////////////////////////////////////////////////////////////////////////////////

var regions = ['DEFINE REGION', 'User-Drawn Boundary', 'GeoJSON Boundary'];

// hide drawing tools and set as object
Map.drawingTools().setShown(false);
var drawingTools = Map.drawingTools();

Map.setCenter(21,34,3);

var country_names;
var attrib_countries = 'ADM0_NAME';

countries.sort(attrib_countries).aggregate_array(attrib_countries).evaluate(function(result) { country_names = result });

var selected_roi, selected_roi_geom, selected_roi_name, regionLayer, lyr_region;

var region_exists = false;

//Helper Functions///////////////////////////////////////////////////////////////////////////////////////////////////

//For QC/QA
var bitwiseExtract = function(input, fromBit, toBit) {
  var maskSize = ee.Number(1).add(toBit).subtract(fromBit);
  var mask = ee.Number(1).leftShift(maskSize).subtract(1);
  return input.rightShift(fromBit).bitwiseAnd(mask);
};

function maskQA_MOD_fire(image){
  var imgDay = image.select('MaxFRP');
  var qcDay = image.select('FireMask');
  // Let's extract all pixels from the input image where
  // Bits 0-3 == 9 (FireMask produced of both good and other quality)
  var qaMask = bitwiseExtract(qcDay, 0, 3).gte(7);
  var mask = qaMask//.and(qaMask2).and(qaMask3)
  var outMasked = imgDay.updateMask(mask);
  return outMasked;
}

function maskQA_FIRMS_fire(image){
  var imgDay = image.select('T21');
  var qcDay = image.select('confidence');
  var qaMask = qcDay.gte(90);
  var mask = qaMask;
  var outMasked = imgDay.updateMask(mask);
  return outMasked;
}

function maskQA_GOES_fire(image){
  var imgDay = image.select('Power');
  var qcDay = image.select('Mask');
  var allFire = qcDay.remap(
    [10, 11, 12, 13, 14, 30, 31, 32, 33, 34],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  var qaMask = allFire.eq(1);
  var mask = qaMask;
  var outMasked = imgDay.updateMask(mask);
  return outMasked;
}

//mask S2 clouds
function MaskS2clouds(image) {
  var qa = image.select('QA60').toInt();
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]);
}

//calculate evi & ndvi
function S2VIcalculator(image){
  
  var select_bands_S2 = ['B2','B3','B4','B8','B11','B12'];
  var rangeBands_S2 = { 
                      blue: image.select(select_bands_S2[0]),
                      green: image.select(select_bands_S2[1]),
                      red: image.select(select_bands_S2[2]),
                      nir: image.select(select_bands_S2[3]),
                      swir:image.select(select_bands_S2[4]),
                      G_evi: ee.Number(2.5),
                      C1_evi: ee.Number(6),
                      C2_evi: ee.Number(7.5),
                      L_evi: ee.Number(1),
                      C1_savi: ee.Number(0.5),
                      C2_savi: ee.Number(1.5),
                      C1_msavi: ee.Number(2),
                      C2_msavi: ee.Number(1),
                      C3_msavi: ee.Number(8)
                    };
  //NDVI
  var ndvi = image.expression({
              expression: '(nir - red) / (nir + red)', 
              map: rangeBands_S2
             });
             
  //EVI 
  var evi = image.expression({
              expression: 'G_evi * ((nir - red) / (nir +  C1_evi * red - C2_evi * blue + L_evi))', 
              map: rangeBands_S2
            });
                
  return image.addBands(ndvi.clip(selected_roi_geom).rename('NDVI'))
              .addBands(evi.clip(selected_roi_geom).rename('EVI'))
              .copyProperties(image, ["system:time_start"])
}


function GetQABitsVIIRS (image, start, end, newName) {
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
}

function CloudMaskVIIRS (image) {
  // Select the QA band.
  var QF1 = image.select(['QF1']);
  var QF2 = image.select(['QF2']);
  // Get the internal_cloud_algorithm_flag bit.
  var Cloud =  GetQABitsVIIRS(image.select("QF1"), 2, 3, "cloud").eq(0);  
  var Shadows =  GetQABitsVIIRS(image.select("QF2"), 3, 3, "shadow").eq(0);
  // Update image mask using clouds and cloud shadows
  return image.updateMask(Shadows).updateMask(Cloud);
}

function VIIRSVIcalculator(image){
  
  var select_bands_VIIRS = ['M3','M5','M7','M4'];
  var rangeBands_VIIRS = { 
                      blue: image.select(select_bands_VIIRS[0]),
                      red: image.select(select_bands_VIIRS[1]),
                      nir: image.select(select_bands_VIIRS[2]),
                      green: image.select(select_bands_VIIRS[3]),
                      G_evi: ee.Number(2.5),
                      C1_evi: ee.Number(6),
                      C2_evi: ee.Number(7.5),
                      L_evi: ee.Number(1)
                    };
  //NDVI
  var ndvi = image.expression({
              expression: '(nir - red) / (nir + red)', 
              map: rangeBands_VIIRS
             });
             
  //EVI 
  var evi = image.expression({
              expression: 'G_evi * ((nir - red) / (nir +  C1_evi * red - C2_evi * blue + L_evi))', 
              map: rangeBands_VIIRS
            });
                
  return image.addBands(ndvi.clip(selected_roi_geom).rename('NDVI'))
              .addBands(evi.clip(selected_roi_geom).rename('EVI'))
              .copyProperties(image, ["system:time_start"])
}

//Normalize eVIIRS
function NormalizeEVIIRS(image){
  var img1 =  image.subtract(100);
  var img2 = img1.divide(100);
  return img2.rename('NDVI')
             .copyProperties(image, ["system:time_start"]);
}

//clip each image and select the band of interest
function ClipperBand(image){
  return image.clip(selected_roi_geom).select(selected_band).copyProperties(image, ["system:time_start"]);
}

//select by date//////////////////////////////////////////////////////////////////////////////////////////////////////
var mosaicker = require('users/firsake/mosaicByDate:ImportantTools/mosaicByDate_module.js');
var reducer = ee.Reducer.median();

//Legend//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var legend_air = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_et = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_fire = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_ppt = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_sm = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_temp = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_veg = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_wt = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legend_lulc = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

var legends = [legend_air, legend_et, legend_fire, legend_ppt, legend_sm, legend_temp, legend_veg, legend_wt, legend_lulc];



var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });

  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });

  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

for (var i = 0; i < legends.length; i++){
  var legend = legends[i];
  var palette = palettes[i];
  var palette_def = palette_defs[i];
  
  for (var j = 0; j < palette.length; j++){
    legend.add(makeRow(palette[j],palette_def[j]));
  }
}

//UI////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var define_regions_placeholder = 'DEFINE REGION';
var roi_subregions_placeholder = 'SELECT COUNTRY';
var data_placeholder = 'SELECT DATASET';
var band_placeholder = 'SELECT BAND';
var stats_placeholder = 'SELECT STATISTIC';
var date_placeholder = 'SELECT IMAGE BY DATE';

//PANELS/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Side Panel/////////////////////////////

var isPanelSide = false;
var isPanelChart = false;
var isPanelInfo = false;

var panelSide = ui.Panel();
panelSide.style().set({
                         position: 'bottom-left',
                         width: '500px',
                         height:'100px'
                      });

var lblImage = ui.Label(
  {
    value:'Select Image',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var selectDate = ui.Select({
  placeholder: date_placeholder,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
  onChange: displayImage
});

//Chart Panel/////////////////////////////
var panelChart = ui.Panel();
panelChart.style().set({
                         position: 'bottom-left',
                         width: '500px',
                         height: '280px'
                      });

//Info Panel//////////////////////////////
var panelInfo = ui.Panel();
panelInfo.style().set({
                         position: 'bottom-left',
                         width: '500px',
                         height: '320px'
                      });
                      
var lbl_title_1 = ui.Label(
  {
    value:'Dataset',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_data_1 = ui.Label(
  {
    style: {fontSize: '12px', color: '#000000', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_title_2 = ui.Label(
  {
    value:'Image Scale (metres)',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_data_2 = ui.Label(
  {
    style: {fontSize: '12px', color: '#000000', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_title_3 = ui.Label(
  {
    value:'Image Capture Frequency',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_data_3 = ui.Label(
  {
    style: {fontSize: '12px', color: '#000000', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_title_4 = ui.Label(
  {
    value:'More Information:',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_data_4 = ui.Label(
  {
    value: 'Open Link',
    style: {fontSize: '11px', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_title_5 = ui.Label(
  {
    value:'Latest Image Date:',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_data_5 = ui.Label(
  {
    style: {fontSize: '12px', color: '#000000', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_title_6 = ui.Label(
  {
    value:'Coverage:',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var lbl_data_6 = ui.Label(
  {
    style: {fontSize: '12px', color: '#000000', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

///////////////////////////////////////////
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');

// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'INSIGHTS',
    style: {fontSize: '20px', fontWeight: 'bold', color: '#000050',  textAlign: 'center',stretch: 'horizontal', margin:'10px 0px 0px 0px'}
  })
]);
panel.add(intro);

//////////////////////////////////////////
var lblBoundaries = ui.Label(
  {
    value:'Boundaries',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'30px 0px 0px 10px'}
  }
);

var selectBoundaryType = ui.Select({
  items: regions,
  placeholder: define_regions_placeholder,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
  onChange: SelectROI
});

var selectRegionName = ui.Select({
  placeholder: roi_subregions_placeholder,
  disabled: true,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
  onChange: ZoomToLayer
});

var textGeoJSON = ui.Textbox({
  placeholder: 'Paste GeoJSON here',
  disabled: true,
  style: {textAlign:'center', margin:'10px', stretch:'horizontal'}
});
//////////////////////////////////////////////

var lblTheme = ui.Label(
  {
    value:'Theme',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var selectTheme = ui.Select({
  items: dataset_themes,
  value: dataset_themes[0],
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'},
  onChange: ProcessData
});

//////////////////////////////////////////////////

var lblData = ui.Label(
  {
    value:'Dataset',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var selectData = ui.Select({
  placeholder: data_placeholder,
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'},
  onChange: ProcessBand
});

var selectBand = ui.Select({
  placeholder: band_placeholder,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
  onChange: RemoveGraph
});

//////////////////////////////////////////////////////

var lblDate = ui.Label(
  {
    value:'Date Selection (YYYY-MM-DD)',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var currentDate = ee.Date(new Date()).format('YYYY-MM-dd').getInfo();
var threeMonthsAgo = ee.Date(new Date()).advance(-3, 'month').format('YYYY-MM-dd').getInfo();

var textStartDate = ui.Textbox({
  placeholder: 'START DATE',
  value: threeMonthsAgo,
  style: {textAlign:'center', margin:'10px', width:'40%'}
});

var textEndDate = ui.Textbox({
  placeholder: 'END DATE',
  value: currentDate,
  style: {textAlign:'center', margin:'10px', width:'40%'}
});

var datePanel = ui.Panel([textStartDate, textEndDate], ui.Panel.Layout.Flow('horizontal'));
datePanel.style().set('margin', '10px');
/////////////////////////////////////////////////////////

var lblStatistic = ui.Label(
  {
    value:'Statistics',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var selectStatistic = ui.Select({
  items: statistics,
  value: statistics[0],
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'},
  onChange: RemoveGraph
});

/////////////////////////////////////////////////////////

var lblRun = ui.Label(
  {
    value: 'PROCESSING SECTION',
    style: {fontSize: '15px', fontWeight: 'bold', color: '#8f3334',  textAlign: 'center', stretch: 'horizontal', padding:'15px'}
  }
);

var button_process = ui.Button({
      label: 'RUN',
      style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
      onClick: Redraw
  }
);

///////////////////////////////////////////////////////////

var lblPanels = ui.Label(
  {
    value:'View Results',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);

var chkPanels = ui.Checkbox({
  label:'Show/Hide',
  value:true,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});

////////////////////////////////////////////////////////////
panel.add(lblBoundaries)
     .add(selectBoundaryType)
     //.add(selectRegionName)
     .add(textGeoJSON)
     .add(lblTheme)
     .add(selectTheme)
     .add(lblData)
     .add(selectData)
     .add(selectBand)
     .add(lblDate)
     .add(datePanel)
     .add(lblStatistic)
     .add(selectStatistic)
     .add(lblRun)
     .add(button_process)
     .add(lblPanels)
     .add(chkPanels);
     
panelSide.add(lblImage)
         .add(selectDate);
         
//UI Functions//////////////////////////////////////////////////////////////////////////////////////////////////

chkPanels.onChange(function(checked) {
  
  if(checked){
    
    if(isPanelSide){
      panelSide.style().set('shown', true);  
    }
    
    if(isPanelChart){
      panelChart.style().set('shown', true);  
    }
    
    if(isPanelInfo){
      panelInfo.style().set('shown', true);  
    }
    
  }else{
    
    if(isPanelSide){
      panelSide.style().set('shown', false);  
    }
    
    if(isPanelChart){
      panelChart.style().set('shown', false);  
    }
    
    if(isPanelInfo){
      panelInfo.style().set('shown', false);  
    }
    
  }
});

function drawGeo(geoname) {
  selected_roi = geoname;
  var geom = ui.Map.GeometryLayer({geometries: null, name: geoname, color: 'darkgreen'});
  drawingTools.layers().add(geom);
  drawingTools.setLinked(false);
  drawingTools.setDrawModes(['polygon']);
  drawingTools.setShape('polygon');
  //drawingTools.setSelected(geom);
  drawingTools.edit();
  drawingTools.draw();
  geom.setName(geoname);
}

drawingTools.onDraw(function (geometry, layer, dt) {
  dt.stop();
  selected_roi_geom = dt.toFeatureCollection('index');
  lyr_region = ee.Image().paint(selected_roi_geom, 0, 2.0);
  Map.centerObject(selected_roi_geom);
  regionLayer = ui.Map.Layer(lyr_region, {palette:['FF0000']}, selected_roi_name);
  Map.add(regionLayer);
  garbage_collector_miniLayers.push(regionLayer);
  layer.setLocked(true);
  layer.setShown(false);
  region_exists = true;
});
  

function SelectROI(){
  
  var roi_define = selectBoundaryType.getValue();
  
  if (roi_define !== null && roi_define !== 'DEFINE REGION'){
  
    switch(roi_define) {
            
      case 'Country Boundaries':
        selectRegionName.setDisabled(false);
        textGeoJSON.setDisabled(true);
        
        selectRegionName.setPlaceholder(roi_subregions_placeholder);
        selectRegionName.items().reset(country_names);
        textGeoJSON.setValue("");
        break;
        
      case 'User-Drawn Boundary':
        selectRegionName.setDisabled(true);
        textGeoJSON.setDisabled(true);
        
        selectRegionName.setPlaceholder(roi_subregions_placeholder);
        textGeoJSON.setValue("");
        
        selected_roi_name = "User_Defined";
        
        drawGeo(selected_roi_name);
        
        break;
        
      case 'GeoJSON Boundary':
        selectRegionName.setDisabled(true);
        textGeoJSON.setDisabled(false);
        
        selectRegionName.setPlaceholder(roi_subregions_placeholder);
        textGeoJSON.setValue("");
        break;
        
      default:
        selectRegionName.setDisabled(true);
        textGeoJSON.setDisabled(true);
        
        selectRegionName.setValue(roi_subregions_placeholder);
        textGeoJSON.setValue("");
        break;
            
    }
    
  }
    
}

function RemoveInfo(){
  try{
    panelInfo.clear();
  }catch(error){
  }
    
  try{
    Map.remove(panelInfo);
    isPanelInfo = false;
  }catch(error){
  }
  
}

function RemoveGraph(){
  
  try{
      panelChart.clear();
  }catch(error){
  }
    
  try{
      Map.remove(panelChart);
      isPanelChart = false;
  }catch(error){
  }
  
  
}

function ProcessData(){
  
  RemoveGraph();
  RemoveLegend();
  RemoveInfo();
  
  var selected_theme = selectTheme.getValue();
  
  if (selected_theme !== null && selected_theme !== 'SELECT THEME'){
  
    switch(selected_theme) {
            
            case 'Air Quality':
              selectData.items().reset(dataset_names[0]);
              break;
            
            case 'Evapo-Transpiration':
              selectData.items().reset(dataset_names[1]);
              break;
              
            case 'Fire':
              selectData.items().reset(dataset_names[2]);
              break;
              
            case 'Precipitation':
              selectData.items().reset(dataset_names[3]);
              break;
              
            case 'Soil Moisture':
              selectData.items().reset(dataset_names[4]);
              break;
              
            case 'Temperature':
              selectData.items().reset(dataset_names[5]);
              break;
              
            case 'Vegetation':
              selectData.items().reset(dataset_names[6]);
              break;
              
            case 'Weather':
              selectData.items().reset(dataset_names[7]);
              break;
              
            case 'LULC':
              selectData.items().reset(dataset_names[8]);
              break;
              
            default:
              selectData.items().reset(data_placeholder);
              break;
            
    }
    
  }else{
      
      alert("Please select a theme first");
      selectTheme.setPlaceholder(roi_theme_layers_placeholder);
      
    }
  
}


function ProcessBand(){
  
  RemoveGraph();
  RemoveInfo();
  
  var selected_data = selectData.getValue();
  var selected_theme = selectTheme.getValue();
  
  if (selected_theme !== null && selected_theme !== 'SELECT THEME' && selected_data !== null && selected_data !== 'SELECT DATA'){
    
    var scale, title, url, temporal, coverage;
    
    scale = dataset_scale[selected_data];
    title = dataset_title[selected_data];
    url = dataset_url[selected_data];
    temporal = dataset_temporal[selected_data];
    coverage = dataset_coverage[selected_data];
    
    lbl_data_1.setValue(title);
    lbl_data_2.setValue(scale);
    lbl_data_3.setValue(temporal);
    lbl_data_4.setUrl(url);
    lbl_data_5.setValue("~fetched after execution~");
    lbl_data_6.setValue(coverage);
    
    
    panelInfo.add(lbl_title_1)
             .add(lbl_data_1)
             .add(lbl_title_2)
             .add(lbl_data_2)
             .add(lbl_title_3)
             .add(lbl_data_3)
             .add(lbl_title_5)
             .add(lbl_data_5)
             .add(lbl_title_6)
             .add(lbl_data_6)
             .add(lbl_title_4)
             .add(lbl_data_4);
    
    Map.add(panelInfo);
    isPanelInfo = true;
    
  
    switch(selected_theme) {
      
             case 'Air Quality':
              if(selected_data == 'S5_CO'){
                selectBand.items().reset(dataset_bands[0][0]);
              } else if(selected_data == 'S5_CH4'){
                selectBand.items().reset(dataset_bands[0][1]);
              } else if(selected_data == 'S5_SO2'){
                selectBand.items().reset(dataset_bands[0][2]);
              } else if(selected_data == 'S5_NO2'){
                selectBand.items().reset(dataset_bands[0][3]);
              } else if(selected_data == 'S5_CO_OFF'){
                selectBand.items().reset(dataset_bands[0][4]);
              } else if(selected_data == 'S5_SO2_OFF'){
                selectBand.items().reset(dataset_bands[0][5]);
              } else if(selected_data == 'S5_NO2_OFF'){
                selectBand.items().reset(dataset_bands[0][6]);
              } else if(selected_data == 'S5_AI'){
                selectBand.items().reset(dataset_bands[0][7]);
              } else if(selected_data == 'S5_CLOUD'){
                selectBand.items().reset(dataset_bands[0][8]);
              } else if(selected_data == 'S5_HCHO'){
                selectBand.items().reset(dataset_bands[0][9]);
              } else if(selected_data == 'S5_O3'){
                selectBand.items().reset(dataset_bands[0][10]);
              } else if(selected_data == 'CAMS_NRT'){
                selectBand.items().reset(dataset_bands[0][11]);
              }else{
                alert("Please select an Air dataset");
              }
              
              break;
            
            case 'Evapo-Transpiration':
              
              if(selected_data == 'MOD16A2'){
                selectBand.items().reset(dataset_bands[1][0]);
              } else if(selected_data == 'WAPOR_Actual'){
                selectBand.items().reset(dataset_bands[1][1]);
              } else if(selected_data == 'WAPOR_Daily'){
                selectBand.items().reset(dataset_bands[1][2]);
              } else if(selected_data == 'WAPOR_DEKADAL'){
                selectBand.items().reset(dataset_bands[1][3]);
              }else{
                alert("Please select a Evapo-Transpiration dataset");
              }
              
              break;
            
            case 'Fire':
              
              if(selected_data == 'GOES_16_FDCF'){
                selectBand.items().reset(dataset_bands[2][0]);
              } else if(selected_data == 'GOES_17_FDCF'){
                selectBand.items().reset(dataset_bands[2][1]);
              } else if(selected_data == 'GOES_18_FDCF'){
                selectBand.items().reset(dataset_bands[2][2]);
              } else if(selected_data == 'MOD14A1'){
                selectBand.items().reset(dataset_bands[2][3]);
              } else if(selected_data == 'MYD14A1'){
                selectBand.items().reset(dataset_bands[2][4]);
              } else if(selected_data == 'FIRMS'){
                selectBand.items().reset(dataset_bands[2][5]);
              } else if(selected_data == 'MOD_A_BAI'){
                selectBand.items().reset(dataset_bands[2][6]);
              } else if(selected_data == 'MOD_T_BAI'){
                selectBand.items().reset(dataset_bands[2][7]);
              }else{
                alert("Please select a Fire dataset");
              }
              
              break;
            
            case 'Precipitation':
              
              if(selected_data == 'CHIRPS_Daily'){
                selectBand.items().reset(dataset_bands[3][0]);
              } else if(selected_data == 'GSMaP'){
                selectBand.items().reset(dataset_bands[3][1]);
              /*} else if(selected_data == 'PERSIANN_CDR'){
                selectBand.items().reset(dataset_bands[3][2]);*/
              } else if(selected_data == 'GRIDMET_D'){
                selectBand.items().reset(dataset_bands[3][2]);
              } else if(selected_data == 'MOD_A_NDSI'){
                selectBand.items().reset(dataset_bands[3][3]);
              } else if(selected_data == 'MOD_T_NDSI'){
                selectBand.items().reset(dataset_bands[3][4]);
              } else if(selected_data == 'PRISM'){
                selectBand.items().reset(dataset_bands[3][5]);
              } else if(selected_data == 'ERA5'){
                selectBand.items().reset(dataset_bands[3][6]);
              } else if(selected_data == 'MOD_A_SNOW'){
                selectBand.items().reset(dataset_bands[3][7]);
              } else if(selected_data == 'MOD_T_SNOW'){
                selectBand.items().reset(dataset_bands[3][8]);
              }else{
                alert("Please select a Precipitation dataset");
              }
              
              break;
            
            case 'Soil Moisture':
              
              if(selected_data == 'NASA_SMAP'){
                selectBand.items().reset(dataset_bands[4][0]);
              } else{
                alert("Please select a Soil Moisture dataset");
              }
              
              break;
            
            case 'Temperature':
              
              if(selected_data == 'MOD11A1'){
                selectBand.items().reset(dataset_bands[5][0]);
              } else if(selected_data == 'MYD11A1'){
                selectBand.items().reset(dataset_bands[5][1]);
              } else if(selected_data == 'PRISM'){
                selectBand.items().reset(dataset_bands[5][2]);
              } else if(selected_data == 'ERA5'){
                selectBand.items().reset(dataset_bands[5][3]);
              } else if(selected_data == 'GCOM_LST'){
                selectBand.items().reset(dataset_bands[5][4]);
              } else if(selected_data == 'GCOM_SST'){
                selectBand.items().reset(dataset_bands[5][5]);
              }else{
                alert("Please select a Temperature dataset");
              }
              
              break;
            
            case 'Vegetation':
              
              if(selected_data == 'MCD15A3H'){
                selectBand.items().reset(dataset_bands[6][0]);
              } else if(selected_data == 'MOD13Q1'){
                selectBand.items().reset(dataset_bands[6][1]);
              } else if(selected_data == 'MYD13Q1'){
                selectBand.items().reset(dataset_bands[6][2]);
              } else if(selected_data == 'MYD15A2H'){
                selectBand.items().reset(dataset_bands[6][3]);
              } else if(selected_data == 'Sentinel_2_VI'){
                selectBand.items().reset(dataset_bands[6][4]);
              } else if(selected_data == 'VNP13A1'){
                selectBand.items().reset(dataset_bands[6][5]);
              // } else if(selected_data == 'LGPP'){
              //   selectBand.items().reset(dataset_bands[6][6]);
              // } else if(selected_data == 'MGPP'){
              //   selectBand.items().reset(dataset_bands[6][7]);
              } else if(selected_data == 'MYD17A2H'){
                selectBand.items().reset(dataset_bands[6][6]);
              } else if(selected_data == 'MOD17A2H'){
                selectBand.items().reset(dataset_bands[6][7]);
              } else if(selected_data == 'MOD_A_EVI'){
                selectBand.items().reset(dataset_bands[6][8]);
              } else if(selected_data == 'MOD_A_NDVI'){
                selectBand.items().reset(dataset_bands[6][9]);
              } else if(selected_data == 'MOD_A_NDWI'){
                selectBand.items().reset(dataset_bands[6][10]);
              } else if(selected_data == 'MOD_T_EVI'){
                selectBand.items().reset(dataset_bands[6][11]);
              } else if(selected_data == 'MOD_T_NDVI'){
                selectBand.items().reset(dataset_bands[6][12]);
              } else if(selected_data == 'MOD_T_NDWI'){
                selectBand.items().reset(dataset_bands[6][13]);
              } else if(selected_data == 'NOAA_NDVI'){
                selectBand.items().reset(dataset_bands[6][14]);
              } else if(selected_data == 'KBDI'){
                selectBand.items().reset(dataset_bands[6][15]);
              } else if(selected_data == 'MODIS_VCI'){
                selectBand.items().reset(dataset_bands[6][16]);
              } else if(selected_data == 'VIIRS_VI'){
                selectBand.items().reset(dataset_bands[6][17]);
              } else if(selected_data == 'VIIRS_VCI'){
                selectBand.items().reset(dataset_bands[6][18]);
              } else if(selected_data == 'eVIIRS_NDVI'){
                selectBand.items().reset(dataset_bands[6][19]);
              } else if(selected_data == 'MODIS_T_VEG'){
                selectBand.items().reset(dataset_bands[6][20]);
              } else if(selected_data == 'MODIS_A_VEG'){
                selectBand.items().reset(dataset_bands[6][21]);
              }else{
                alert("Please select a Vegetation dataset");
              }
              
              break;
              
          case 'Weather':
            
            if(selected_data == 'RTMA'){
                selectBand.items().reset(dataset_bands[7][0]);
            }else{
                alert("Please select a Weather dataset");
            }
            
            break;
            
          case 'LULC':
            
            if(selected_data == 'LULC'){
                selectBand.items().reset(dataset_bands[8][0]);
            }else{
                alert("Please select an LULC dataset");
            }
            
            break;
              
          default:
            break;
            
    }
    
  }else{
      
      alert("Please select a dataset/theme first");
      selectTheme.setPlaceholder(roi_theme_layers_placeholder);
      
    }
  
}





function ZoomToLayer_geojson(){
  
  Map.layers().reset();
  RemoveGraph();
  
  ResetWidgets();
  
  var selected_geojson = textGeoJSON.getValue();
  
  if (selected_geojson !== null && selected_geojson !== ''){
    
    selected_roi_geom = ee.FeatureCollection(JSON.parse(selected_geojson));
    lyr_region = ee.Image().paint(selected_roi_geom, 0, 2.0);
    selected_roi_name = "GeoJSON Layer";
    regionLayer = ui.Map.Layer(lyr_region, {palette:['FF0000']}, selected_roi_name);
    Map.centerObject(selected_roi_geom);
    region_exists = true;
    
  }
  
}



function ZoomToLayer(){
  
  Map.layers().reset();
  RemoveGraph();
  
  var selected_region = selectRegionName.getValue();
  
  ResetWidgets();
  
  lyr_region = ee.Image().paint(region(countries,selected_region,attrib_countries).geometry(), 0, 4.0);
  selected_roi_name = selected_region;
  regionLayer = ui.Map.Layer(lyr_region.clip(region(countries,selected_region,attrib_countries).geometry()), {palette:['FF0000']}, selected_roi_name);
  selected_roi_geom = region(countries,selected_region,attrib_countries).geometry();
  Map.centerObject(selected_roi_geom);
  Map.add(regionLayer);
  garbage_collector_miniLayers.push(regionLayer);
  region_exists = true;
  
}

var region = function(boundary,name,property) {
  var result = boundary.filter(ee.Filter.eq(property, name)).first();
  return result;
};


function RemoveSide(){
  
  try{
    Map.remove(panelSide);
    isPanelSide = false;
  }catch(error){
  }
  
  
}

function RemoveLegend(){
  try{
      Map.remove(legend_et);
    }catch(error){
    }
    
    try{
      Map.remove(legend_fire);
    }catch(error){
    }
    
    try{
      Map.remove(legend_sm);
    }catch(error){
    }
    
    try{
      Map.remove(legend_veg);
    }catch(error){
    }
    
    try{
      Map.remove(legend_ppt);
    }catch(error){
    }
    
    try{
      Map.remove(legend_temp);
    }catch(error){
    }
    
    try{
      Map.remove(legend_air);
    }catch(error){
    }
    
    try{
      Map.remove(legend_wt);
    }catch(error){
    }
    
    try{
      Map.remove(legend_lulc);
    }catch(error){
    }
}

function ResetWidgets(){
  
    RemoveLegend();
    
    try{
      
      for (var j = 0; j < garbage_collector_miniLayers.length; j++){
        Map.remove(garbage_collector_miniLayers[j]);
      }
      
      
    }catch(error){
    }
    
    Map.setCenter(21,34,3);
}

function displayImage(){
  
  var selected_date = selectDate.getValue();
  
  var selected_theme = selectTheme.getValue();
  var selected_vizParam = vizParams[dataset_themes.indexOf(selected_theme)-1];
  
  var selected_image;
  if (selected_data != "LULC"){
    selected_image = ee.Image(image_collection.filter(ee.Filter.eq('date', selected_date)).first());
  }else{
    selected_image = ee.Image(unaltered_image_collection.filter(ee.Filter.eq('date', selected_date)).first());
  }
  
  try{
    Map.remove(lyr_image);
  }catch(error){
  }
  
  var minmax =  minMax(selected_image.clip(selected_roi_geom), selected_roi_geom, dataset_scale[selected_data], selectBand.getValue());
  
  selected_vizParam.min = minmax[0];
  selected_vizParam.max = minmax[1];
  
  lyr_image = ui.Map.Layer(selected_image.clip(selected_roi_geom), selected_vizParam, "Date : " + selected_date);
  Map.add(lyr_image);
  
}


function minMax(image, roi, scale, band){
  
  var ls_stat = image.reduceRegion({
                      reducer: ee.Reducer.minMax(),
                      geometry: roi,
                      scale: scale,
                      crs: "EPSG:4326",
                      maxPixels: 1e13,
                      bestEffort: true,
                      tileScale: 16
                    });
                    
  var ls_min = ee.Number(ls_stat.get(band + '_min')).getInfo();
  var ls_max = ee.Number(ls_stat.get(band + '_max')).getInfo();
  
  return [ls_min, ls_max];
  
}

function Aggregate_Statistic(image, roi, scale, band, reducer){
  
  var ls_stat = image.reduceRegion({
                      reducer: reducer,
                      geometry: roi,
                      scale: scale,
                      crs: "EPSG:4326",
                      maxPixels: 1e13,
                      bestEffort: true,
                      tileScale: 16
                    });
                    
  return ls_stat.getInfo();
  
}


function Rescale(image){
  
  var selected_multiplier;
  var selected_data = selectData.getValue();
  selected_band = selectBand.getValue();
  
  if(selected_data != 'MCD15A3H' && selected_data != 'MYD15A2H'){
    
    selected_multiplier = dataset_multiplier[selected_data];  
  
  }else{
    
    var list_scaler = dataset_multiplier[selected_data];
    
    if(selected_band == 'Fpar' || selected_band == 'Fpar_500m' ){
      selected_multiplier = list_scaler[0];
    }else{
      selected_multiplier = list_scaler[1];    
    }
  }
  
  return image.multiply(selected_multiplier).copyProperties(image, ["system:time_start"]);
  
}


function Redraw(){
  
  //Map.layers().reset();
  RemoveGraph();
  ResetWidgets();
  
  
  selected_data = selectData.getValue();
  selected_band = selectBand.getValue();
  var selected_start_date = textStartDate.getValue();
  var selected_end_date = textEndDate.getValue();
  var selected_statistic = selectStatistic.getValue();
  var selected_theme = selectTheme.getValue();
  
  if(selectBoundaryType.getValue() == "DEFINE REGION"){
    
    alert("Please define a Region");
    return null;
  
  }else{
    
    if(selectBoundaryType.getValue() == "User-Drawn Boundary" && region_exists === false ){
      alert("Please draw a Region");
      return null;
    }else{
      selected_roi_name = "User_Defined";
    }
    
    if(selectBoundaryType.getValue() == "GeoJSON Boundary" && textGeoJSON.getValue() === ""){
      alert("Please paste a GeoJSON");
      return null;
    }else{
      
      ZoomToLayer_geojson();
      selected_roi_name = "GeoJSON Layer";
      
      if(region_exists === false){
        alert("Please paste a valid GeoJSON");
        return null;
      }
      
    }
    
  }
  
  if(selected_data === null || selected_data == 'SELECT DATASET'){
    alert("Please select a Dataset");
    return null;
  }
  
  if(selected_theme === null || selected_theme == 'SELECT THEME'){
    alert("Please select a Theme");
    return null;
  }
  
  if(selected_band === null || selected_band == 'SELECT BAND'){
    alert("Please select a Band");
    return null;
  }
  
  if(selected_statistic === null || selected_statistic == 'SELECT STATISTIC'){
    alert("Please select a Statistic");
    return null;
  }
  
  if(selected_statistic != 'Histogram (LULC)' && selected_data == "LULC"){
    alert("Please select a the Histogram (LULC) Statistic");
    return null;
  }
  
  if(selected_start_date === null || selected_start_date === ''){
    alert("Please select a Start Date");
    return null;
  }
  
  if(selected_end_date === null || selected_end_date === ''){
    alert("Please select an End Date");
    return null;
  }
  
  Map.centerObject(selected_roi_geom);
  Map.add(regionLayer);
  garbage_collector_miniLayers.push(regionLayer);
  
  var selected_imagecol = dataset_map[selected_data];
  var selected_scale = dataset_scale[selected_data];
  
  var selected_legend = legends[dataset_themes.indexOf(selected_theme)-1];
  var selected_statistic_reducer = statistic_reducers[statistics.indexOf(selected_statistic)-1];
  
  
  if (selected_data == "Sentinel_2_VI"){
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date)
                                    .filterBounds(selected_roi_geom)
                                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                                    .map(MaskS2clouds)
                                    .map(S2VIcalculator)
                                    .map(ClipperBand);
                                    
  } else if (selected_data == "VIIRS_VI"){
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date)
                                    .filterBounds(selected_roi_geom)
                                    //.map(CloudMaskVIIRS)
                                    .map(VIIRSVIcalculator)
                                    .map(ClipperBand);
  
  }else if(selected_data == "MODIS_VCI"){
    selected_imagecol = modis_vci_IC.getVCIcollection(selected_roi_geom);
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date);
    
  }else if(selected_data == "VIIRS_VCI"){
    selected_imagecol = viirs_vci_IC.getVCIcollection(selected_roi_geom);
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date);
  
  }else if(selected_data == "LULC"){
    selected_imagecol = lulc_IC.GetLULC(selected_roi_geom);
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date);
  
  }else if(selected_data == "eVIIRS_NDVI"){
    
      var assetListeVIIRS = ee.data.listAssets('projects/shamba-oracle-services/assets/EXT/eVIIRS');
      var assetListeVIIRS_2 = ee.data.listAssets('projects/shamba-oracle-services/assets/EXT/eVIIRS_Historical');
      var listDataeVIIRS = assetListeVIIRS.assets;
      var listDataeVIIRS_2 = assetListeVIIRS_2.assets;
      
      var imagesListeVIIRS = [];
      
      for (var i = 0; i < listDataeVIIRS_2.length; i++) {
        var img = ee.Image(listDataeVIIRS_2[i].id).clip(selected_roi_geom);
        imagesListeVIIRS.push(img);
      }
      
      for (var j = 0; j < listDataeVIIRS.length; j++) {
        var img_ = ee.Image(listDataeVIIRS[j].id).clip(selected_roi_geom);
        imagesListeVIIRS.push(img_);
      }
      
      selected_imagecol = ee.ImageCollection(imagesListeVIIRS);
      
      image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date)
                                                             .map(NormalizeEVIIRS);
                   
  }else if(selected_data == "MOD14A1" || selected_data == "MYD14A1" ){
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date)
                                    .filterBounds(selected_roi_geom)
                                    .map(maskQA_MOD_fire)
                                    .map(ClipperBand)
                                    .map(Rescale);
                                    
  }else if(selected_data == "FIRMS"){
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date)
                                    .filterBounds(selected_roi_geom)
                                    .map(maskQA_FIRMS_fire)
                                    .map(ClipperBand)
                                    .map(Rescale);
                                   
  }else if(selected_data == "GOES_16_FDCF" || selected_data == "GOES_17_FDCF" || selected_data == "GOES_18_FDCF" ){
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date)
                                    .filterBounds(selected_roi_geom)
                                    .map(maskQA_GOES_fire)
                                    .map(ClipperBand)
                                    .map(Rescale);
                                   
  }else{
    image_collection = selected_imagecol.filterDate(selected_start_date, selected_end_date)
                                    .filterBounds(selected_roi_geom)
                                    .map(ClipperBand)
                                    .map(Rescale);
  }
  
  //dates selection
  var dates, dates_list;
  if (selected_data != "LULC"){
    image_collection = mosaicker.mosaicByDate(image_collection, reducer);
    dates = image_collection.reduceColumns(ee.Reducer.toList(), ['date']).get('list');
    dates_list = dates.getInfo();
    selectDate.items().reset(dates_list);
  }else{
    unaltered_image_collection =  mosaicker.mosaicByDate(image_collection, reducer);
    dates = unaltered_image_collection.reduceColumns(ee.Reducer.toList(), ['date']).get('list');
    dates_list = dates.getInfo();
    selectDate.items().reset(dates_list);
  }
  
  var last_date = ee.Date(selected_imagecol.filterBounds(selected_roi_geom).filterDate('1970-01-01', currentDate).limit(1, 'system:time_start', false).first().get('system:time_start')).format('YYYY-MM-dd').getInfo();
  lbl_data_5.setValue(last_date);
  
  if(dates_list.length > 0){
    
    RemoveSide();
    
    Map.add(panelSide);
    isPanelSide = true;
    
    var final_chart;
    
    //get aggregates
    var stat_operation = statistics[statistics.indexOf(selected_statistic)];
    var aggregate_statistics, aggregate_image;
    
  
    if(stat_operation == 'Mean'){
      aggregate_image = image_collection.mean();
      aggregate_statistics = Aggregate_Statistic(aggregate_image, selected_roi_geom, selected_scale, selected_band, selected_statistic_reducer);
    }else if(stat_operation == 'Max'){
      aggregate_image = image_collection.max();
      aggregate_statistics = Aggregate_Statistic(aggregate_image, selected_roi_geom, selected_scale, selected_band, selected_statistic_reducer);
    } else if(stat_operation == 'Min'){
      aggregate_image = image_collection.min();
      aggregate_statistics = Aggregate_Statistic(aggregate_image, selected_roi_geom, selected_scale, selected_band, selected_statistic_reducer);
    } else if(stat_operation == 'Median'){
      aggregate_image = image_collection.median();
      aggregate_statistics = Aggregate_Statistic(aggregate_image, selected_roi_geom, selected_scale, selected_band, selected_statistic_reducer);
    } else if(stat_operation == 'Sum'){
      aggregate_image = image_collection.sum();
      aggregate_statistics = Aggregate_Statistic(aggregate_image, selected_roi_geom, selected_scale, selected_band, selected_statistic_reducer);
    }else{
      aggregate_statistics = {"Null":""};
    }
    
    aggregate_statistics = aggregate_statistics[selected_band];
    
    // Create an image time series chart.
    var ft_col;
    if(selected_data == "Sentinel_2_VI"){
      
      ft_col = image_collection.map(function(img) {
        var date = img.get('system:time_start');
        var stat_value = img.reduceRegion({
            reducer: selected_statistic_reducer,
            geometry: selected_roi_geom,
            maxPixels: 1e30,
            bestEffort: true,
            tileScale: 8,
            scale: selected_scale, //change for faster computation
            crs:"EPSG:4326"
        }).get(selected_band);
        
        if(selected_band == 'NDVI'){
          return ee.Feature(null, { 'NDVI': stat_value, 'system:time_start': date });
        }else if(selected_band == 'EVI'){
          return ee.Feature(null, { 'EVI': stat_value, 'system:time_start': date });
        }else{
          return ee.Feature(null, { 'LULC': stat_value, 'system:time_start': date });
        }
        
      });
      
      Export.table.toDrive({
        collection: ft_col, 
        description:'ROI_Data',
        folder: 'Shamba',
        fileFormat: 'CSV'
      });
      
      
      final_chart = ui.Chart.feature.byFeature(ft_col, 'system:time_start', selected_band);
    
    } else if(selected_data == "LULC") {
      
      ft_col = image_collection.map(function(img) {
        var date = img.get('system:time_start');
        var stat_value = img.reduceRegion({
            reducer: ee.Reducer.frequencyHistogram().setOutputs(['Pixel Count']),
            geometry: selected_roi_geom,
            maxPixels: 1e30,
            bestEffort: true,
            tileScale: 8,
            scale: 0.5, //change for faster computation
            crs:"EPSG:4326"
        }).get('LULC');
        var lulc_histogram = ee.Dictionary(stat_value);
        var class_freq = {};
        palette_def_lulc.forEach(function(className, index) {
          class_freq[className] = ee.Number(lulc_histogram.get(index.toString(), 0));
        });
        return ee.Feature(null, ee.Dictionary(class_freq).set('system:time_start', date));
      });

      // Create a chart to display the LULC frequencies over time
      final_chart = ui.Chart.feature.byFeature(ft_col, 'system:time_start', palette_def_lulc);

      Export.table.toDrive({
        collection: ft_col, 
        description:'ROI_Data',
        folder: 'Shamba',
        fileFormat: 'CSV'
      });
      
    } else {
      
      final_chart = ui.Chart.image.series({
        imageCollection: image_collection,
        region: selected_roi_geom,
        reducer: selected_statistic_reducer,
        scale: selected_scale,
        xProperty: 'system:time_start'
      });
      
      //UNCOMMENT TO DOWNLOAD WITH PRECISION
      ft_col = image_collection.map(function(img) {
        var date = img.get('system:time_start');
        var stat_value = img.reduceRegion({
            reducer: selected_statistic_reducer,
            geometry: selected_roi_geom,
            maxPixels: 1e30,
            bestEffort: true,
            tileScale: 8,
            scale: selected_scale, //change for faster computation
            crs:"EPSG:4326"
        }).get(selected_band);
        
        return ee.Feature(null, {selected_band: stat_value, 'system:time_start': date });
        
      });
      
      
      Export.table.toDrive({
        collection: ft_col, 
        description:'ROI_Data',
        folder: 'Shamba',
        fileFormat: 'CSV'
      });
      
    }
    
    final_chart.style().set({
          position: 'top-center'
    });
      
    if (selected_data != "LULC"){
      final_chart
      .setChartType('LineChart')
      .setOptions({
        title: "Graph of " + selected_statistic + "s for " + selected_roi_name + " : " + selected_start_date + " - " + selected_end_date,
        vAxis: {
            title: selected_band
        },
        interpolateNulls: true,
        hAxis: {
            title: "Date"
        },
        lineWidth: 1,
        pointSize: 4,
        series: {
            0: {color: 'FF0000'}
          }
      });
    }else{
      final_chart
      .setChartType('LineChart')
      .setOptions({
        title: "Graph of " + selected_statistic + "s for " + selected_roi_name + " : " + selected_start_date + " - " + selected_end_date,
        hAxis: { title: 'Date' },
        vAxis: { title: 'Pixel Count' },
        lineWidth: 1,
        pointSize: 4,
        series: {
            0: { color: '#' + palette_lulc[0] },
            1: { color: '#' + palette_lulc[1] },
            2: { color: '#' + palette_lulc[2] },
            3: { color: '#' + palette_lulc[3] },
            4: { color: '#' + palette_lulc[4] },
            5: { color: '#' + palette_lulc[5] },
            6: { color: '#' + palette_lulc[6] }
        }
      });
    }
    
    
    panelChart.add(final_chart);
    var stats_lbl = ui.Label({
                              value:" Aggregate Value : " + aggregate_statistics,
                              style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign:'center', stretch:'horizontal', margin:'2px'},   
    }); 
    panelChart.add(stats_lbl);
    Map.add(panelChart);
    isPanelChart = true;
    Map.add(selected_legend);
    
    
  }else{
      alert("Current date selection has no images.");
  }
  
}


// Add the panel to the ui.root.
ui.root.insert(0, panel);
