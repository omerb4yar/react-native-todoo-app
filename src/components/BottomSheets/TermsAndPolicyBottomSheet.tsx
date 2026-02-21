

import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, Ref } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetProps, BottomSheetView } from '@gorhom/bottom-sheet'

const TermsAndPolicyBottomSheet = forwardRef(({...props} : BottomSheetProps, bottomSheetRef : Ref<BottomSheet>) => {

    return (

        <BottomSheet
        handleIndicatorStyle = {{backgroundColor : "gray"}}
        keyboardBehavior='interactive'
        backdropComponent={(props) => <BottomSheetBackdrop disappearsOnIndex={-1} {...props}/>}
        index={-1}
        enablePanDownToClose
        snapPoints={props.snapPoints}
        ref={bottomSheetRef}>
        <BottomSheetView style = {styles.bottomSheetContent}>
                <ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.title}>Terms & Conditions</Text>

    <Text style={styles.text}>
        Bu uygulamayı kullanarak aşağıdaki şartları kabul etmiş olursunuz.
    </Text>

    <Text style={styles.text}>
        • Uygulama, kullanıcıların içerik paylaşmasına ve etkileşim kurmasına olanak sağlar.
    </Text>

    <Text style={styles.text}>
        • Paylaşılan içeriklerden kullanıcıların kendisi sorumludur.
    </Text>

    <Text style={styles.text}>
        • Yasalara aykırı, saldırgan veya uygunsuz içerikler uyarı olmaksızın kaldırılabilir.
    </Text>

    <Text style={styles.text}>
        • Uygulama sahibi, gerekli gördüğü durumlarda hesapları askıya alma veya silme hakkını saklı tutar.
    </Text>

    <Text style={styles.text}>
        • Uygulamanın kesintisiz veya hatasız çalışacağı garanti edilmez.
    </Text>

    <Text style={styles.text}>
        • Bu şartlar gerektiğinde güncellenebilir.
    </Text>

    <Text style={[styles.title, { marginTop: 24 }]}>
        Privacy Policy
    </Text>

    <Text style={styles.text}>
        Gizliliğiniz bizim için önemlidir.
    </Text>

    <Text style={styles.text}>
        • Uygulamada yalnızca gerekli bilgiler (ör. e-posta, kullanıcı adı, paylaşımlar) toplanır.
    </Text>

    <Text style={styles.text}>
        • Kişisel veriler üçüncü taraflarla satılmaz veya paylaşılmaz.
    </Text>

    <Text style={styles.text}>
        • Veriler, uygulama deneyimini iyileştirmek ve güvenliği sağlamak amacıyla kullanılır.
    </Text>

    <Text style={styles.text}>
        • Kullanıcılar istedikleri zaman hesaplarını ve verilerini silebilir.
    </Text>

    <Text style={styles.text}>
        Uygulamayı kullanarak bu gizlilik politikasını kabul etmiş sayılırsınız.
    </Text>
    </ScrollView>

        </BottomSheetView>
            </BottomSheet>
    )
})

export default TermsAndPolicyBottomSheet

const styles = StyleSheet.create({
    bottomSheetContent : {
        flex : 1,
        padding : 10,
        alignItems : "center"
    },

    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        color : "#313131",
        fontWeight: "bold",
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
        color: "#1a1a1a",
    },
})